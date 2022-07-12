<template>
    <div class="modal">
        <div class="modal-layer" @click="$emit('close')"></div>
        <slot></slot>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
    export default {
        name: 'ModalLayer',
        computed: mapGetters({
            isTablet: ['viewport/isTablet']
        }),
        mounted() {
            if (this.isTablet)
                document.body.style.overflow = 'hidden'
        },
        destroyed() {document.body.style.overflow = null}
    }
</script>

<style lang="scss" scoped>
    .modal {
        width: 100%;
        height: 100%;
        @include flex(center, center);
        @include position(fixed, 0, 0);
        z-index: $modal-index;
    }
    .modal-layer {
        width: 100%;
        height: 100%;
        @include position(absolute, 0, 0);
        background-color: black;
        opacity: .8;
    }
</style>
