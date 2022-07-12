<template>
    <h3 class="account__subtitle"><slot></slot><hr :style="{margin: !$slots.default ? '0' : '.833rem'}"></h3>
</template>

<script>
export default {
    name: 'AccountSubtitle',
}
</script>

<style lang="scss" scoped>
.account__subtitle {
    width: 39.583rem;
    @include flex(initial, center);
    @include font-size(18);
    text-transform: uppercase;
    color: $color-gray;
    font-weight: 400;
    margin: 0 0 1.14583rem 0;
    hr {
        flex: 1;
        background-color: $color-gray;
        height: 1px;
        border: 0;
    }
}
</style>
