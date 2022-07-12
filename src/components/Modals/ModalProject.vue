<template>
    <Modal :title="action === ModalAction.CREATE ?
        'Создание проекта' : action === ModalAction.UPDATE ?
        'Редактирование проекта' : null">

        <div class="field-wrapper">
            <label class="modal-form-label" for="title">Название проекта</label>
            <input id="title" v-role.disabled="Role.ADMIN" v-model="title" type="text" class="modal-form-input" placeholder="Введите название проекта"/>
        </div>

        <div class="field-wrapper">
            <label class="modal-form-label" for="date">Дата создания</label>
            <input id="date" v-role.disabled="Role.ADMIN" v-model="date" type="date" class="modal-form-date"/>
        </div>

        <UploadFiles :files="files" v-if="action === ModalAction.CREATE"
                     @add="file => $store.commit('projectFile/add', file)"
                     @remove="fileId => $store.commit('projectFile/delete', fileId)"/>
        <UploadFiles :files="files" v-if="action === ModalAction.UPDATE"
                     @add="file => $store.dispatch('projectFile/upload', {id: this.projectId, file})"
                     @remove="fileId => $store.dispatch('projectFile/delete', {id: this.projectId, fileId})"/>

        <button v-role.disabled="Role.ADMIN" ref="btn" type="button" v-if="action === ModalAction.CREATE" @click="create" class="modal-btn-sky">Создать проект</button>
        <button v-role.disabled="Role.ADMIN" ref="btn" type="button" v-if="action === ModalAction.UPDATE" @click="update" class="modal-btn-sky">Сохранить</button>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from "vue-class-component"
import {ModalWindow} from "./modal"
import {EventBus} from "@/main"
import {EventSystem} from "@/config/event"
import {commit, dispatch, getters} from '@/store'
import {Project} from "@/interfaces/project"

const Modal = () => import('@/components/Modals/Modal.vue')
const UploadFiles = () => import('@/components/Modals/Elements/UploadFiles.vue')
@Component({
    components: {Modal, UploadFiles}
})
export default class ModalProject extends mixins(ModalWindow) {

    private projectId: number = null
    private action: string = null
    private title: string = ''
    private date: string  = ''

    private get project(): Project {return getters['project/getProject']}
    private get files() {return getters['projectFile/getFiles']}
    private get id(): number {return +this.$route.params.id}

    private getProject(): Project {
        const {title, date} = this
        return <Project>{title, date}
    }

    private resetParams() {
        commit('projectFile/setFiles', [])
        this.title = ''
        this.date = null
    }

    private create() {
        const project: any = this.getProject()
        const files: any = this.files
        if (files.length) project.files = this.files
        dispatch('project/create', {id: this.id, params: project})
        this.close()
    }

    private update() {
        const project: Project = this.getProject()
        dispatch('project/update', {id: this.projectId, params: project})
        this.close()
    }

    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_EDITION_PROJECT, ({id, action}) => {
            this.projectId = id
            this.action = action
            this.resetParams()

            dispatch('project/getById', id).then(() => {
                const {title, date} = this.project
                this.title = title
                this.date = date
                console.log(this.project)
                this.open()
            })

        })

        EventBus.$on(EventSystem.SWITCH_MODAL_CREATION_PROJECT, ({action}) => {
            this.action = action
            this.resetParams()
            this.open()

        })
    }
}

</script>
