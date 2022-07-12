<template>
    <form class="form">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'ModalForm'
    }
</script>

<style lang="scss" scoped>
    .form {
        width: 46.875rem;
        max-height: 100%;
        overflow-x: hidden;
        z-index: inherit;
        background-color: white;
        padding: 2.083rem 1.71875rem;
        border-radius: .78125rem;
    }

    @media only screen and (max-width: 480px) {
        .form {
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
    }
</style>
