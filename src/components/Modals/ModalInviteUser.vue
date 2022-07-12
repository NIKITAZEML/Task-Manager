<template>
    <Modal title="Добавление участников">
        <div class="form-wrapper mb-0">
            <div class="field-wrapper modal-form-grow">
                <input autocomplete="off" v-model="email" id="member" type="text" class="modal-form-input search-input mb-0" placeholder="Введите Email пользователя"/>
            </div>
            <button @click="invite" type="button" class="btn-action">Пригласить</button>
        </div>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component'
import {ModalWindow} from "@/components/Modals/modal.ts"
const Modal = () => import('@/components/Modals/Modal.vue')

import {EventBus} from "@/main"
import {EventSystem} from "@/config/event.ts"
import {dispatch} from '@/store'

@Component({
    computed: {
        id() {return +this.$route.params.id}
    },
    components: {Modal}
})
export default class ModalInviteUser extends mixins(ModalWindow) {

    private id: number
    private email: string = ''

    public async invite() {
        const alert = this.$alert
        const email = this.email
        if (!email) return

        const open = (msg: string): Promise<any> => alert(msg, {type: 'success'})
            .then(() => this.open())
            .catch(e => {})

        try {
            const res = await dispatch('board/addUser', {boardId: this.id, email})
            const {status} = res
            if (status === 200) await open('Пользователь приглашен на доску')
            if (status === 202) await open('Приглашение было отправлено на почту')
            this.email = ''
        } catch (e) {
            const msg = e.data.message
            if (msg.email) alert(msg.email[0], {type: 'error'}).catch(e => {})
            else alert(msg, {type: 'error'}).catch(e => {})
        }
    }

    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_INVITE_USER, () => {
            this.email = ''
            this.open()
        })
    }

}
</script>
