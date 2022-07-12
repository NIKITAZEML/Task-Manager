<template>
    <Modal :title="action ===ModalAction.CREATE ?
             'Создание новой задачи' : action === ModalAction.UPDATE ?
             'Редактирование задачи' : null">
            <div v-if="isMobile" class="modal__control_mobile">
                <div class="modal-form-row mb-0">
                    <BtnWithIcon v-if="action === ModalAction.UPDATE" icon="comments" @click.native="isDetail = !isDetail"/>
                    <BtnWithIcon v-if="action === ModalAction.UPDATE" icon="history" @click.native="isHistory = !isHistory"/>
                </div>
                <button disabled ref="btn" type="button" v-if="action === ModalAction.CREATE" @click="create" class="modal-btn-sky">Добавить задачу</button>
                <button :disabled="disabled" ref="btn" type="button" v-if="action === ModalAction.UPDATE" @click="update" class="modal-btn-sky">Сохранить</button>
            </div>

            <div class="field-wrapper">
                <textarea v-role:any.disabled="`${Role.ADMIN}`" @input="title.length ? $refs['btn'].disabled = false : $refs['btn'].disabled = true" v-focus maxlength="2000" v-model="title" id="title" class="modal-form-textarea" placeholder="Введите описание задачи"></textarea>
            </div>

<!--            <Subtasks v-if="action === 'create' && online"-->
<!--                      :disabled="disabled"-->
<!--                      @add="subtask => $store.commit('subtask/add', subtask)"-->
<!--                      @update="subtask => $store.commit('subtask/update', subtask)"-->
<!--                      @remove="id => $store.commit('subtask/delete', id)"/>-->

<!--            <Subtasks v-if="action === 'update' && online"-->
<!--                      :disabled="disabled"-->
<!--                      @add="subtask => $store.dispatch('subtask/create', {taskId, subtask})"-->
<!--                      @update="subtask => $store.dispatch('subtask/update',{taskId, subtask})"-->
<!--                      @remove="subtaskId => $store.dispatch('subtask/delete', {taskId, subtaskId})"/>-->

            <ExecutorCreate @select="select"
                            :target="responsible"
                            @add="$store.commit('executor/add', {id: uuid(), fullName: '', isLocal: true})"/>

            <Executors :executors="executors"
                       @remove="({id, isLocal}) => isLocal ?
                            $store.commit('executor/delete', id) :
                            $store.dispatch('executor/delete', {taskId, executorId: id})"/>

            <div class="modal-form-wrapper-items-2">
                <div class="field-wrapper">
                    <select v-role.disabled="Role.ADMIN" v-model="task.icon" id="action" class="modal-form-select" >
                        <option value="">Выберите действие</option>
                        <option v-for="item of actions" :key="item.id" :value="item.description">{{item.description}}</option>
                    </select>
                </div>

                <div class="field-wrapper">
                    <input v-role.disabled="Role.ADMIN" v-model="term" type="date" class="modal-form-date"/>
                </div>
            </div>

            <div class="field-wrapper">
                <SearchProjects :action="action" :value="task.project || ''" @select="project => task.project = project">
                    <input v-role.disabled="Role.ADMIN" maxlength="350" autocomplete="off" v-model.trim="task.project" type="text" class="modal-form-input search-input" placeholder="Введите название проекта"/>
                </SearchProjects>
            </div>

            <div class="field-wrapper">
                <select v-role.disabled="Role.ADMIN" v-model="task.status" class="modal-form-select" >
                    <option v-for="value of $store.getters['task/getStatus']" :value="value">{{value}}</option>
                </select>
            </div>

            <UploadFiles :files="files" v-if="action === ModalAction.CREATE"
                         @add="file => $store.commit('taskFile/add', file)"
                         @remove="fileId => $store.commit('taskFile/delete', fileId)"/>
            <UploadFiles :files="files" v-if="action === ModalAction.UPDATE"
                         @add="file => $store.dispatch('taskFile/upload', {id: taskId, file})"
                         @remove="fileId => $store.dispatch('taskFile/delete', {id: taskId, fileId})"/>

            <HistoryLogs v-if="action === 'update' && isHistory" :id="taskId"/>

            <div v-if="isDetail && action === 'update'">
                <Comments/>
            </div>

            <div v-if="!isMobile" class="form-wrapper mb-0 modal__footer">
                <button v-role.disabled="Role.ADMIN" ref="btn" type="button" v-if="action === 'create'" @click="create" class="modal-btn-sky">Добавить задачу</button>
                <button v-role.disabled="Role.ADMIN" ref="btn" type="button" v-if="action === 'update'" @click="update" class="modal-btn-sky">Сохранить</button>
                <div class="modal-form-row mb-0">
                    <BtnWithIcon @click.native="isHistory = !isHistory" v-if="action === 'update'" icon="history" title="История"/>
                    <BtnWithIcon @click.native="isDetail = !isDetail" icon="comments" title="Комментарии"/>
                    <ModalContextMenu v-if="action === 'update'" :action="action" @remove="remove"/>
                </div>
            </div>
    </Modal>
</template>

<script lang="ts">
import moment from 'moment'

moment.locale('ru')
import {EventBus} from "@/main"
import {dispatch, commit} from '@/store'
import {v4 as uuid} from 'uuid'
import {EventSystem, ModalAction, TaskModalPayloadContext} from "@/config/event.ts"
import {getters} from '@/store'

import {Watch} from "vue-property-decorator"
import Component, {mixins} from "vue-class-component"
import {ModalWindow} from "@/components/Modals/modal.ts"
const Modal = () => import('@/components/Modals/Modal.vue')
import {Task} from "@/interfaces/task"

const ModalContextMenu = () => import('@/components/Modals/Elements/ModalContextMenu.vue')
const ButtonAdd = () => import('@/components/Buttons/ButtonAdd.vue')
const ButtonRemove = () => import('@/components/Buttons/ButtonRemove.vue')
const UploadFiles = () => import('@/components/Modals/Elements/UploadFiles.vue')
const Comments = () => import('@/components/Modals/Elements/Comments.vue')
const Subtasks = () => import('@/components/Modals/Elements/subtask/Subtasks.vue')
const Executors = () => import('@/components/Modals/Elements/Executors.vue')
const ExecutorCreate = () => import('@/components/Modals/Elements/ExecutorCreate.vue')
const HistoryLogs = () => import('@/components/Modals/Elements/HistoryLogs.vue')
const BtnWithIcon = () => import('@/components/Modals/Elements/BtnWithIcon.vue')
const SearchExecutors = () => import('@/components/Modals/Elements/search/SearchExecutors.vue')
const SearchProjects = () => import('@/components/Modals/Elements/search/SearchProjects.vue')

@Component({
    components: {
        Modal, ExecutorCreate, HistoryLogs, ButtonAdd, ButtonRemove, UploadFiles, Comments, Executors, BtnWithIcon, SearchExecutors, SearchProjects, ModalContextMenu
    }
})
export default class ModalTask extends mixins(ModalWindow) {

    @Watch('$route.query.taskId')
    queryTaskWatch() {
        const id = +this.$route.query.taskId
        if (Number.isInteger(id)) {
            return EventBus.$emit(EventSystem.SWITCH_MODAL_EDITION_TASK, {action: ModalAction.UPDATE, id})
        }
        this.$router.replace({query: {}}).catch(()=>{})
    }

    private title = ''
    private taskId = null
    private action = null
    private term = ''
    private responsible = {id: uuid(), fullName: ''}
    private isDetail = false
    private isHistory = false
    private disabled = false

    get id() {return +this.$route.params.id}
    get actions() {return getters['task/getIcons']}
    get task() {return getters['task/getTask']}
    get projects() {return getters['project/getProjects']}
    get users() {return getters['board/getUsers']}
    get isMobile() {return getters['viewport/isMobile']}
    get versions() {return getters ['board/getVersions']}
    get subtasks() {return getters['subtask/getSubtasks']}
    get comments() {return getters['comment/getComments']}
    get executors() {return getters['executor/getExecutors']}
    get files() {return getters['taskFile/getFiles']}

    getFullName(value): string {
        if (value) {
            const firstName = value.split(' ')[0]
            const lastName = value.split(' ')[1] || ''
            if (lastName || firstName)
                return `${firstName} ${lastName}`
        } else return ''
    }

    select({fullName, executorId}) {
        this.responsible.id = executorId
        this.responsible.fullName = fullName
    }

    resetParams() {
        commit('subtask/setSubtasks', [])
        commit('taskFile/setFiles', [])
        commit('executor/setExecutors', [])
        this.title = ''
        this.task.project = ''
        this.task.icon = ''
        this.responsible = {id: uuid(), fullName: ''}
        this.term = ''
        this.isDetail = false
    }

    getTask(): Task {
        const {title, subtasks, executors} = this
        const responsible = !this.responsible.fullName ? {id: uuid(), fullName: ''} : this.responsible
        const project = this.task.project
        const status = this.task.status
        const term = moment(this.term.trim(), 'YYYY-MM-DD').format('YYYY-MM-DD')
        const icon = this.task.icon ? this.task.icon : null
        return <Task>{title, term, project, icon, status, subtasks, responsible, executors}
    }

    private create() {
        const params = this.getTask()
        if (!this.term) Reflect.deleteProperty(params, 'term')
        if (this.files.length) params.files = this.files

        if (this.title) {
            dispatch('task/create', {id: this.id, params})
                .then(() => dispatch('board/getById', this.id))
            this.close()
        }
    }

    private update() {
        const params = this.getTask()
        params.term === 'Invalid date' ? params.term = null : null
        EventBus.$emit(EventSystem.TASK_PRELOADER_RENDER, this.task)
        dispatch('task/update', {id: this.taskId, params})
            .then(() => {
                EventBus.$emit(EventSystem.TASK_PRELOADER_DISABLE, this.task)
                dispatch('board/getById', this.id)
            })
        this.close()
    }

    private remove() {
        const message = 'После удаления, восстановление не возможно.'
        this.$confirm(message, {confirmButtonText: 'ОК', cancelButtonText: 'Отмена', type: 'warning'}).then(() => {
            dispatch('task/delete', this.taskId)
            this.close()
        }).catch(() => {})
    }

    mounted() {
            const close = e => e.keyCode === 27 ? this.close() : null
            window.addEventListener('keydown',  close)
        }
        created() {
            EventBus.$on(EventSystem.SWITCH_MODAL_CREATION_TASK, ({action, ctx, project}) => {
                this.resetParams()
                this.action = action
                if (ctx === TaskModalPayloadContext.PROJECT)
                    this.task.project = project
                this.open()
            })
            EventBus.$on(EventSystem.SWITCH_MODAL_EDITION_TASK, ({id, action}) => {
                this.resetParams()
                this.action = action
                this.taskId = id
                this.$router.push({query: {taskId: this.taskId}}).catch(() => {})

                dispatch('task/getById', id).then(() => {
                    const {title, icon, term, responsible, date} = this.task
                    this.title = title
                    this.task.icon = icon ?? ''
                    this.term = term ? term.split('T')[0] : ''
                    this.responsible = responsible ? responsible : {id: uuid(), fullName: ''}
                    this.open()
                })
            })
        }

}
</script>

<style scoped lang="scss">
    .modal-table-wrapper {@include flex(space-between);}
    .col-left {width: 55.6%;}
    .col-right {width: 42.8%;}
    @media only screen and (max-width: 480px) {
        .modal__footer {
            flex-direction: column;
            > .form-control {margin: 0 0 1.66rem 0;}
        }
        .modal__control_mobile {
            @include flex(space-between, center);
            padding: 0 0 .83rem 0;
            margin: 0 0 .83rem 0;
            position: relative;
            ::before {
                content: "";
                position: absolute;
                width: 200%;
                height: 1px;
                background-color: #E3ECF3;
                bottom: 0;
                left: -50%;
                pointer-events: none;
            }
        }
    }
</style>
