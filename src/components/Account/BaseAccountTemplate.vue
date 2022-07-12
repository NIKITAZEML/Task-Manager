<template>
    <div>
        <div class="account-container container">
            <AccountNavigationBar/>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import AccountNavigationBar from '@/components/Account/AccountNavigationBar.vue'
import {Component, Vue} from 'vue-property-decorator'
import {dispatch} from '@/store'

@Component({
    components: {AccountNavigationBar}
})
export default class BaseAccountTemplate extends Vue {
    created() {
        dispatch('user/getProfile')
    }
}
</script>

<style lang="scss" scoped>
.container {width: 77.083rem;}
.account-container {
    @include flex();
    padding: 2.5rem 0;
}
.account__title {
    @include font-size(24);
    color: $primary-text;
    margin: 0 0 2.34375rem 0;
}

@media only screen and (max-width: 768px) {
    .account-container {width: 85.6%;}
}
</style>
