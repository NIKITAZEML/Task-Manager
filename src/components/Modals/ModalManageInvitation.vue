<template>
    <Modal title="Модерация приглашений участников">
        <div class="users">
            <div class="user" v-for="(user, i) of users" :key="i">
                <div class="user__wrapper">
                    <el-avatar fit="cover" src="https://images.wallpaperscraft.ru/image/kot_zelenoglazyj_morda_vzglyad_118128_1366x768.jpg" size="medium"/>
                    <div class="user__email">{{user.fullName}}</div>
                </div>
                <el-button @click.native="confirm(user.id)" size="mini" round type="success">Принять</el-button>
            </div>
            <div v-if="!users.length">Список приглашений пуст</div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from "vue-class-component"
import {ModalWindow} from "@/components/Modals/modal.ts"
const Modal = () => import('@/components/Modals/Modal.vue')

import {mapGetters} from "vuex"
import {dispatch} from '@/store'
import {EventBus} from "@/main"
import {EventSystem} from "@/config/event.ts"
import {User} from "@/interfaces/user"

@Component({
    computed: {
        id() {return +this.$route.params.id},
        ...mapGetters('board', {invitations: 'getInvitations'})
    },
    components: {Modal}
})
export default class ModalManageInvitation extends mixins(ModalWindow) {

    private id: number
    private users: User[] = []

    public confirm(id: number): void {
        dispatch('board/confirmInvitation', {boardId: this.id, userId: id})
            .then(() => this.users = this.users.filter(u => u.id !== id))
    }

    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_MANAGE_INVITATION, () => {
            dispatch('board/getInvitations', this.id)
                .then(users => this.users = users)
                .finally(() => this.open())
        })
    }

}
</script>

<style lang="scss" scoped>
.users {@include flex(initial, initial, column);}
.user {
    @include flex(space-between, center);
    padding: .5rem;
    margin: 0 0 1.5rem 0;
    &:last-child {margin: 0;}
}
.user__wrapper {@include flex(initial, center);}
.user__email {
    @include font-size(20);
    margin: 0 0 0 .5rem;
}
</style>
