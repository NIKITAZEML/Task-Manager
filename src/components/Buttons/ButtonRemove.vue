<template>
    <svg class="btn-remove" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5858 0.446777L6.34313 4.68942L2.10049 0.446777L0.686279 1.86099L4.92892 6.10363L0.686279 10.3463L2.10049 11.7605L6.34313 7.51785L10.5858 11.7605L12 10.3463L7.75735 6.10363L12 1.86099L10.5858 0.446777Z" fill="#B6B7B9"/>
    </svg>
</template>

<script>
export default {
    name: 'ButtonRemove'
}
</script>

<style lang="scss" scoped>
.btn-remove {
    width: .625rem;
    min-width: .625rem;
    cursor: pointer;
    transition: $transition-default;
    &:hover {transform: scale(1.2);}
    &:hover path {fill: $color-red;}
}
</style>
