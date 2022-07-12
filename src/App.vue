<template>
    <fragment>
        <ModalWindowsManager/>
        <router-view/>
    </fragment>
</template>

<script>

import ModalWindowsManager from "@/components/Modals/ModalWindowsManager.vue"

export default {
    mounted() {
        window.addEventListener('resize', () => {
            const w = window.innerWidth
            const view = (screen, val) => this.$store.commit(`viewport/is${screen}`, val)
            w > 768 ? view('Tablet', false) : view('Tablet', true)
            w > 480 ? view('Mobile', false) : view('Mobile', true)
        })
    },
    components: {ModalWindowsManager}
}
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    html {font-size: .9vw;}
    body {
        font-family: Open Sans, sans-serif !important;
        color: $primary-text;
        -webkit-text-size-adjust: none;
    }

    .el-popover {
        min-width: initial;
        padding: 1rem;
        cursor: pointer;
    }
    .el-dropdown-menu__item {
        @include font-size(20);
        padding: 0 1rem;
    }

    @media only screen and (max-width: 768px) {
        html {font-size: 2.5vw;}
    }

    @media only screen and (max-width: 480px) {
        html {font-size: 4vw;}
    }
</style>
