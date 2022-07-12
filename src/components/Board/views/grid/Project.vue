<template>
    <div class="card">
        <div class="card__wrapper">
            <div @click="openEditProjectModal" class="card__title">{{ title }}</div>
            <svg @click="openCreateTaskModal" class="card__icon" width="18" height="19" viewBox="0 0 18 19" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M9.81818 14.2581V10.4479H13.6283V8.81158H9.81818V5.00143H8.18182V8.81158H4.37166V10.4479H8.18182V14.2581H9.81818Z" fill="#838F9F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.364 15.9937C11.8492 19.5084 6.15076 19.5084 2.63604 15.9937C-0.87868 12.479 -0.87868 6.78052 2.63604 3.2658C6.15076 -0.248919 11.8492 -0.248919 15.364 3.2658C18.8787 6.78052 18.8787 12.479 15.364 15.9937ZM14.2069 14.8366C17.0826 11.961 17.0826 7.29856 14.2069 4.42288C11.3312 1.5472 6.6688 1.5472 3.79312 4.42288C0.917444 7.29856 0.917444 11.961 3.79312 14.8366C6.6688 17.7123 11.3312 17.7123 14.2069 14.8366Z" fill="#838F9F"/>
            </svg>
        </div>
        <div class="card__tasks" v-if="project.tasks && project.tasks.length">
            <Task v-for="(task, i) of project.tasks" :key="i" :task="task"/>
        </div>
        <div class="card__empty" v-else>Список задач проекта пуст</div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import Task from "@/components/Board/views/grid/Task.vue"
import {EventBus} from "@/main"
import {Project as IProject} from "@/interfaces/project"
import {EventSystem, ModalPayload, ModalAction, TaskModalPayload, TaskModalPayloadContext} from "@/config/event"

@Component({
    components: {Task}
})
export default class Project extends Vue {

    @Prop({type: Object, required: true, default: () => ({})})
    private project: IProject

    public get title(): string {
        return this.project.title.length < 30 ? this.project.title : `${this.project.title.substr(0, 30)}...`
    }

    public openEditProjectModal(): void {
        const payload: ModalPayload = {
            id: this.project.id,
            action: ModalAction.UPDATE,
        }
        EventBus.$emit(EventSystem.SWITCH_MODAL_EDITION_PROJECT, <ModalPayload>payload)
    }

    public openCreateTaskModal(): void {
        const payload: TaskModalPayload = {
            action: ModalAction.CREATE,
            project: this.project.title,
            ctx: TaskModalPayloadContext.PROJECT
        }
        EventBus.$emit(EventSystem.SWITCH_MODAL_CREATION_TASK, <TaskModalPayload>payload)
    }

}
</script>

<style scoped lang="scss">
.card {
    width: 19.16rem;
    @include flex(initial, initial, column);
    margin: 0 .45rem 1.5625rem 0;
    &:nth-of-type(5n + 5) {margin-right: 0;}
}
.card__wrapper {
    width: max-content;
    cursor: pointer;
    @include flex(initial, center);
    margin: 0 0 .625rem 0;
    @extend .path-hover;
}
.card__title {
    @include font-size(18);
    color: $primary-text;
    font-weight: bold;
    margin: 0 .572916rem 0 0;
}
.card__icon {
    width: 1.25rem;
    height: 1.25rem;
}
.tasks {
    @include font-size(16, 140%);
    color: $primary-text;
    cursor: pointer;
}
.card__tasks {
    @extend .tasks;
    background-color: white;
    border: 1px solid $primary-border;
    box-shadow: 0 .2083rem .78125rem .10416rem rgba(0, 0, 0, 0.08);
    border-radius: .416rem;
}

.card__empty {
    padding: .5rem .833rem .5rem .5rem;
    border-bottom: 1px solid #E1E2E9;
    transition: $transition-default;
    &:hover {background-color: #E1E2E9;}
    user-select: none;
    position: relative;
    text-align: center;
    @include font-size(18, 140%);
    border-radius: .416rem;
}

@media only screen and (max-width: 768px) {
    .card {
        width: 16.4rem;
        &:nth-of-type(5n + 5) {margin-right: .45rem;}
        &:nth-of-type(2n + 2) {margin-right: 0;}
    }
}
@media only screen and (max-width: 480px) {
    .card {
        width: 100%;
        margin-right: 0;
    }
}
</style>
