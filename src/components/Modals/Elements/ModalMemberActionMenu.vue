<template>
    <div class="actions" v-if="user.id !== board.owner && role === Role.ADMIN">
        <div class="actions__layer"></div>
        <div class="items" v-on-clickaway="close">
            <div @click="editPermission(Role.ADMIN)" class="action">администратор</div>
            <div @click="editPermission(Role.CONTROL)" class="action">контроль</div>
            <div @click="editPermission(Role.EXECUTOR)" class="action">исполнитель</div>
            <div @click="editPermission(Role.VIEWER)" class="action">участник</div>
            <div class="action">
                <svg class="action__icon" width="20" height="20" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.25575 5.81966L7.84154 4.40544L10.67 1.57702C12.6226 -0.375606 15.7884 -0.375607 17.741 1.57702C19.6937 3.52964 19.6937 6.69546 17.741 8.64808L14.9126 11.4765L13.4984 10.0623L16.3268 7.23387C17.4984 6.0623 17.4984 4.1628 16.3268 2.99123C15.1552 1.81966 13.2557 1.81966 12.0842 2.99123L9.25575 5.81966Z" fill="white"/>
                    <path d="M10.67 12.8907L12.0842 14.3049L9.25575 17.1334C7.30313 19.086 4.1373 19.086 2.18468 17.1334C0.232059 15.1807 0.23206 12.0149 2.18468 10.0623L5.01311 7.23387L6.42732 8.64808L3.59889 11.4765C2.42732 12.6481 2.42732 14.5476 3.59889 15.7192C4.77047 16.8907 6.66996 16.8907 7.84154 15.7192L10.67 12.8907Z" fill="white"/>
                    <path d="M7.13443 13.5978L14.2055 6.52676L12.7913 5.11255L5.72021 12.1836L7.13443 13.5978Z" fill="white"/>
                </svg>
                <div>ссылка</div>
            </div>
            <div class="action" @click="deleteUser">
                <svg class="action__icon" width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="24 / basic / trash"><path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M6.99137 0.714615H10.9914C11.7278 0.714615 12.3247 1.31157 12.3247 2.04795V2.71461H14.3247C15.0611 2.71461 15.658 3.31157 15.658 4.04795V5.38128C15.658 6.11766 15.0611 6.71461 14.3247 6.71461H14.2713L13.6581 14.0479C13.6581 14.7843 13.0611 15.3813 12.3247 15.3813H5.65808C4.9217 15.3813 4.32475 14.7843 4.32705 14.1033L3.71132 6.71461H3.65804C2.92166 6.71461 2.32471 6.11766 2.32471 5.38128V4.04795C2.32471 3.31157 2.92166 2.71461 3.65804 2.71461H5.65804V2.04795C5.65804 1.31157 6.25499 0.714615 6.99137 0.714615ZM3.65804 4.04795L5.65804 4.04795H12.3247L14.3247 4.04795V5.38128H3.65804V4.04795ZM5.04905 6.71461H12.9335L12.327 13.9926L12.3247 14.0479H5.65806L5.04905 6.71461ZM10.9914 2.04795V2.71461H6.99137V2.04795H10.9914Z" fill="white"/></g>
                </svg>
                <div>удалить</div>
            </div>
        </div>
        </div>
</template>

<script>
import {mixin as clickaway} from 'vue-clickaway'
    import {mapGetters} from 'vuex'
    import {dispatch} from '@/store'

    export default {
        name: 'ModalMemberActionMenu',
        mixins: [clickaway],
        props: {
            user: Object
        },
        computed: {
            id() {return +this.$route.params.id},
            ...mapGetters({
                board: ['board/getBoard'],
                role: ['user/getRole']
            })
        },
        methods: {
            close() {
                this.$emit('close')
            },
            deleteUser() {
                dispatch('board/deleteUser', {boardId: this.id, userId: this.user.id})
                    .then(() => dispatch('board/getUsers', this.id))
            },
            editPermission(role) {
                const params = {id: this.user.id, role}
                dispatch('board/editPermissionUser', {boardId: this.id, params}).then(() => {
                    dispatch('board/getUsers', this.id)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .actions {
        width: 7.8125rem;
        @include position(absolute, calc(100% - 7.8125rem), 100%, $modal-actions-index);
    }
    .actions__layer {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: transparent;
        z-index: $modal-index;
        cursor: default;
    }
    .action {
        height: 1.875rem;
        @include flex(initial, center);
        color: white;
        background-color: rgba(43, 43, 43, 0.8);
        cursor: pointer;
        padding: 0 .78125rem;
        transition: $transition-default;
        &:hover {background-color: $color-sky;}
        &:first-child {border-radius: .260416rem .260416rem 0 0;}
        &:last-child {border-radius: 0 0 .260416rem .260416rem;}
        &:nth-of-type(4) {border-bottom: 1px solid rgba(255, 255, 255, .5);}
        position: relative;
        z-index: $modal-actions-index;
    }
    .action__icon {
        width: .83rem;
        height: .83rem;
        margin: 0 .52083rem 0 0;
    }
</style>
