<template>
    <div v-if="task.id" v-loading="loading" class="task" :data-id="task.id" :data-project="task.project" @click="EventBus.$emit(EventSystem.SWITCH_MODAL_EDITION_TASK, {action: 'update', id: task.id})">
        <TaskStatus v-if="task.status" :status="task.status"/>
        <span v-if="task.responsible && task.responsible.fullName" class="task__executor">
            {{task.responsible.fullName}}
            <img class="task__icon" src="@/assets/icon/arrow.svg"/>
        </span>
        <div v-if="task.title" class="task__title">
            <img v-if="task.icon_url" class="task__action" :src="task.icon_url"/>
            <div class="task__content">
                <span>{{clipTitle}}</span>
                <span v-if="term" :class="`task__deadline ${isDeadline ? 'kill' : null}`">{{term}}</span>
            </div>
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

<style scoped lang="scss">
.task {
    padding: .5rem .833rem .5rem .5rem;
    border-bottom: 1px solid #E1E2E9;
    transition: $transition-default;
    &:hover {background-color: #E1E2E9;}
    user-select: none;
    position: relative;
}
.task__action {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0 .46875rem 0 0;
}
.task__executor {
    color: $color-gray;
    margin: 0 0 .2rem 0;
}
.task__icon {
    width: .625rem;
    height: .625rem;
}
.task__title {
    display: flex;
    @include font-size(16, 150%);
}
.task__content {word-break: break-word;}
.task__deadline {
    color: $color-green;
    margin: 0 0 0 .3125rem;
}
.task__deadline.kill {color: $color-red;}
</style>

