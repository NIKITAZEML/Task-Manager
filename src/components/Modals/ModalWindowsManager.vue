<template>
    <div>
        <ModalTask/>
        <ModalProject/>
        <ModalBoard/>
        <ModalInviteUser/>
        <ModalManageInvitation/>
        <ModalMovementTasks/>
        <ModalDirectory/>
    </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator'
const ModalTask = () => import('@/components/Modals/ModalTask.vue')
const ModalProject = () => import('@/components/Modals/ModalProject.vue')
const ModalBoard = () => import('@/components/Modals/ModalBoard.vue')
const ModalInviteUser = () => import('@/components/Modals/ModalInviteUser.vue')
const ModalManageInvitation = () => import('@/components/Modals/ModalManageInvitation.vue')
const ModalMovementTasks = () => import('@/components/Modals/ModalMovementTasks.vue')
const ModalDirectory = () => import('@/components/Modals/ModalDirectory.vue')

@Component({
    components: {
        ModalDirectory, ModalProject, ModalTask, ModalBoard, ModalInviteUser, ModalManageInvitation, ModalMovementTasks}
})
export default class ModalWindowsManager extends Vue {}

</script>
