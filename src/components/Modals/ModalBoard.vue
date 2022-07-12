<template>
    <Modal :title="action === 'create' ?
        'Создание новой доски' : action === 'update' ?
        'Редактирование доски' : null">

        <div class="field-wrapper">
            <label class="modal-form-label" for="board">Название доски</label>
            <input autocomplete="off" v-model="title" id="board" class="modal-form-input" placeholder="Введите название доски"/>
        </div>

        <div class="field-wrapper">
            <label class="modal-form-label" for="type">Тип доски</label>
            <select v-model="status" class="modal-form-select" id="type">
                <option v-for="(value, i) of BOARD_TYPES" :key="i" :value="value[0]">{{value[1]}}</option>
            </select>
        </div>

        <div v-if="action === ModalAction.UPDATE">
            <div class="modal-form-label">Участники</div>
            <div class="members">
                <ModalMemberItem v-for="(user, i) of users" :key="i" :user="user"/>
            </div>
        </div>

        <ModalFormLink/>

        <div class="form-control">
            <button @click="create" type="button" v-if="action === ModalAction.CREATE" class="modal-btn-sky">Создать доску</button>
            <button @click="update" type="button" v-if="action === ModalAction.UPDATE" class="modal-btn-sky">Редактировать</button>
            <div @click="close" class="btn-exit">Закрыть</div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component'
import {ModalWindow} from "@/components/Modals/modal.ts"

import {EventBus} from "@/main"
import {EventSystem} from "@/config/event"
import {mapGetters} from 'vuex'
import {BOARD_TYPES} from "@/config/app.ts"
import {dispatch} from '@/store'

const Modal = () => import('@/components/Modals/Modal.vue')
const ModalMemberItem = () => import('@/components/Modals/Elements/ModalMemberItem.vue')
const ModalFormLink = () => import('@/components/Modals/Elements/ModalFormLink.vue')

import {Board} from "@/interfaces/board"
import {User} from "@/interfaces/user"

@Component({
    computed: {
        id() {return +this.$route.params.id},
        ...mapGetters('board', {
            users: 'getUsers',
            board: 'getBoard'
        })
    },
    components: {Modal, ModalMemberItem, ModalFormLink,}
})
export default class ModalBoard extends mixins(ModalWindow) {

    private id: number
    private title: string = ''
    private status: string = ''
    private action: string = null
    private BOARD_TYPES = BOARD_TYPES

    private board: Board
    private users: User[]

    reset() {this.title = ''}

    getParams() {
        const title = this.title
        const status = this.status
        return {title, status}
    }

    create() {
        dispatch('board/create', this.getParams())
            .finally(() => this.close())
    }

    update() {
        dispatch('board/update', {id: this.id, params: this.getParams()})
            .finally(() => this.close())
    }

    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_CREATION_BOARD, ({action}) => {
            this.action = action
            this.status = BOARD_TYPES[0][0]
            this.reset()
            this.open()
        })
        EventBus.$on(EventSystem.SWITCH_MODAL_EDITION_BOARD, ({action}) => {
            this.action = action
            this.title = this.board.title
            this.status = this.board.status
            this.open()
            console.log(this.board)
        })
    }

}
</script>

<style scoped lang="scss">

.members {padding: 1rem 0;}

</style>
