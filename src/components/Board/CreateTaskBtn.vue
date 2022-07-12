<template>
    <div class="btn" @click="openCreateTaskModal">
        <div class="btn__text">Добавить задачу</div>
<!--        <svg class="btn__icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9978 1.41895L9.01794 1.41895L9.01794 9.33854L1.09835 9.33854V11.3184L9.01794 11.3184L9.01794 19.238L10.9978 19.238L10.9978 11.3184H18.9174V9.33854H10.9978L10.9978 1.41895Z" fill="#01A2FD"/>-->
<!--        </svg>-->
<!--        <img class="btn-mobile" src="@/assets/icon/create-circle.svg"/>-->
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {EventBus} from "@/main"
import {EventSystem, TaskModalPayload, ModalAction, TaskModalPayloadContext} from "@/config/event.ts"

@Component
export default class CreateTaskBtn extends Vue {

        public openCreateTaskModal(): void {
            const payload: TaskModalPayload = {
                action: ModalAction.CREATE,
                ctx: TaskModalPayloadContext.DEFAULT
            }
            EventBus.$emit(EventSystem.SWITCH_MODAL_CREATION_TASK, <TaskModalPayload>payload)
        }

    }
</script>

<style scoped lang="scss">
    .btn {
        @include flex(initial, center);
        cursor: pointer;
    }
    .btn__text {
        position: relative;
        @include font-size(18);
        font-weight: 500;
        color: $color-sky;
    }
    .btn__icon {
        width: 1rem;
        margin: 0 0 0 .78125rem;
    }
    .btn-mobile {
        width: 2.34375rem;
        height: 2.34375rem;
        margin: 0 0 0 .78125rem;
        display: none;
    }
    @media only screen and (max-width: 768px) {
        .btn__icon {display: none;}
        .btn-mobile {display: block;}
    }

    @media only screen and (max-width: 480px) {
        .btn__icon {display: block;}
        .btn-mobile {display: none;}
    }
</style>
