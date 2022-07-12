<template>
    <div v-if="task.id" v-loading="loading" class="table" :data-id="task.id" :data-project="task.project" @click="EventBus.$emit(EventSystem.SWITCH_MODAL_EDITION_TASK, {action: 'update', id: task.id})">
        <TaskStatus v-if="task.status" :status="task.status"/>
        <div :class="`table-task ${isDeadline && this.task.term ? 'kill' : ''}`" v-if="!isTablet">
            <span class="el-col-12">{{clipTitle}}</span>
            <span class="el-col-4">{{task.project ? task.project : ''}}</span>
            <span class="el-col-3 el-col-offset-1">{{task.responsible ? task.responsible.fullName : ''}}</span>
            <span :class="`el-col-2 table-deadline ${isDeadline ? 'kill' : ''}`">{{term ? term : ''}}</span>
            <span class="el-col-2" v-for="(status, i) of $store.getters['task/getStatus']" :key="i" v-if="task.status === status">{{status}}</span>
        </div>
        <div class="table-task" v-if="isTablet">
            <span class="el-col-16">{{clipTitle}}</span>
            <span class="el-col-7 el-col-offset-1">{{task.responsible ? task.responsible : ''}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component'
import TaskStatus from "@/components/Board/TaskStatus.vue"
import TaskMixin from "@/components/Board/views/task.ts"

@Component({
    components: {TaskStatus}
})
export default class Task extends mixins(TaskMixin) {}
</script>

<style lang="scss">
.table .status {
    width: .8rem;
    height: .8rem;
    @include position(absolute, calc(100% - (.8rem + .8rem)), calc(50% - .4rem));
}
</style>

<style lang="scss" scoped>
.table {
    background-color: white;
    transition: $transition-default;
    &:hover {background-color: #E1E2E9;}
    border-radius: $br-default;
    user-select: none;
    position: relative;
    cursor: pointer;
}
.table-task {
    @include flex(initial, center);
    @include font-size(16);
    border: 1px solid #E1E2E9;
    box-shadow: 0 .2083rem .78125rem .10416rem rgba(0, 0, 0, 0.08);
    padding: .6rem .8rem;
    margin: 0 0 .3125rem 0;
    border-radius: inherit;
}
.table-deadline {color: $color-green;}
.table-deadline.kill {color: $color-red;}
.table-task.kill {background-color: rgb(222,42,75, 0.2);}

@media only screen and (max-width: 480px) {
    .table-task {padding: 1rem;}
    .table-task {@include font-size(16);}
}
</style>
