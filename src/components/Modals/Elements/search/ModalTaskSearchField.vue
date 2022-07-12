<template>
    <div class="search-layer">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ModalTaskSearchField'
}
</script>

<style lang="scss" scoped>
.search-layer {
    display: flex;
    position: relative;
}
.search-input {flex: 1;}
.search-input + .search-input-layer {
    width: 100%;
    max-height: 10rem;
    overflow-y: auto;
    overflow-x: hidden;
    @include position(absolute, initial, 2.7083rem);
    box-shadow: 0 0.2083rem 0.78125rem 0.10416rem rgba(0, 0, 0, 0.08);
    transition: $transition-default;
    z-index: $modal-actions-index;
}
.search-input:focus + .search-input-layer {
    visibility: visible;
    opacity: 1;
}
.search-input:not(:focus) + .search-input-layer {
    visibility: hidden;
    opacity: 0;
}
.search-input + .search-input-layer:hover {background-color: $color-sky;}
.search-input-item {
    background-color: white;
    cursor: default;
    transition: .2s all ease;
    border-bottom: 1px solid #E1E2E9;
    &:hover {
        background-color: #E1E2E9;
        transform: translateX(.260416rem);
    }
    padding: .5rem;
}
</style>
