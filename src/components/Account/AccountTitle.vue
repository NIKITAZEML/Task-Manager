<template>
    <h2 class="account__title"><slot></slot></h2>
</template>
<script>
export default {
    name: 'AccountTitle'
}
</script>

<style lang="scss">
.account__title {
@include font-size(24);
    color: $primary-text;
    margin: 0 0 2.34375rem 0;
}
</style>
