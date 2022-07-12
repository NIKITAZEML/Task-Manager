<template>
    <svg class="btn-add" width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10C0 4.47715 4.47715 0 10 0H60C65.5228 0 70 4.47715 70 10V30C70 35.5228 65.5228 40 60 40H10C4.47715 40 0 35.5228 0 30V10Z" fill="#0079FB"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M34 13V19H28V21H34V27H36V21H42V19H36V13H34Z" fill="white"/>
    </svg>
</template>

<script>
export default {
    name: 'ButtonAdd'
}
</script>

<style lang="scss" scoped>
.btn-add {
    width: 3.64583rem;
    height: 2.083rem;
    transition: $transition-default;
    cursor: pointer;
    &:active {transform: scale(.9);}
    &:hover {stroke: $color-sky;}
    &:hover path {transition: $transition-default;}
    &:hover path:first-child {fill: white;}
    &:hover path:last-child[fill="white"] {fill: $color-sky;}
}
.btn-add.disabled {pointer-events: none;}
</style>
