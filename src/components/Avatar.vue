<template>
    <router-link ref="avatar" to="/account/settings" v-html="createAvatar()" class="avatar"/>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {generateFromString} from 'generate-avatar'
import Cookie from '@/helpers/cookie/Cookie'

@Component
export default class Avatar extends Vue {

    public createAvatar(): string {
        return generateFromString(<string>Cookie.get('token'))
    }

    mounted() {
        const avatar: SVGElement = <SVGElement>Array.from((this.$refs.avatar as any).$el.getElementsByTagName('svg'))[0]
        avatar.style.width = 'inherit'
        avatar.style.height = 'inherit'
        avatar.style.borderRadius = '100%'
    }
}
</script>

<style lang="scss" scoped>
    .avatar {
        width: 2.5rem;
        height: 2.5rem;
        @include flex(center, center);
        @include font-size(23);
        border-radius: 100%;
        color: white;
        background-color: $color-green;
        user-select: none;
        cursor: pointer;
    }

    .avatar > svg {
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit;
    }

    @media only screen and (max-width: 480px) {

    }
</style>
