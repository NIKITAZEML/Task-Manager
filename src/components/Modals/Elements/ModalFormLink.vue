<template>
    <div @click="copy" class="form__link">
        <img class="link__icon" src="@/assets/icon/link.svg"/>
        <div ref="link" class="link__text">Скопировать ссылку на доску</div>
    </div>
</template>

<script lang="ts">
import path from 'path'
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class ModalFormLink extends Vue {

    public copy(): void {
        navigator.clipboard.writeText(path.join(location.origin, location.pathname))
        this.$message.info('Ссылка на доску добавлена в буфер')
    }

}

</script>

<style lang="scss" scoped>
    .form__link {
        width: 100%;
        position: relative;
        @include flex(initial, center);
        cursor: pointer;
        padding: .9375rem;
        margin: 0 0 1.66rem 0;
        &::before {
            content: "";
            width: calc(100% + (1.71875rem * 2));
            height: 1px;
            @include position(absolute, -1.71875rem, 0);
            background-color: #E5E5E5;
        }
        &::after {
            content: "";
            width: calc(100% + (1.71875rem * 2));
            height: 1px;
            @include position(absolute, -1.71875rem, 100%);
            background-color: #E5E5E5;
        }
    }
    .link__icon {
        width: 1.0416rem;
        height: 1.0416rem;
        margin: 0 .46875rem 0 0;
    }
    .link__text {
        @include font-size(18);
        color: $color-sky;
    }
</style>
