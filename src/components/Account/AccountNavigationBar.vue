<template>
    <div class="profile">
        <div class="profile__user">
            <Avatar/>
            <div class="user__wrapper">
                <div class="user__name">{{user.last_name}} {{user.first_name}}</div>
                <div v-if="user.email" class="user__email">{{user.email}}</div>
            </div>
        </div>
        <div class="profile__actions">
            <router-link to="/boards" class="action">
                <svg class="action__icon" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4043 2.24707V18.2471C20.4043 19.3516 19.5089 20.2471 18.4043 20.2471H14.4043H6.4043H2.4043C1.29973 20.2471 0.404297 19.3516 0.404297 18.2471V2.24707C0.404297 1.1425 1.29973 0.24707 2.4043 0.24707H6.4043H14.4043H18.4043C19.5089 0.24707 20.4043 1.1425 20.4043 2.24707ZM14.4043 2.24707H18.4043V9.24707H14.4043V2.24707ZM12.4043 11.2471H8.4043V18.2471H12.4043V11.2471ZM8.4043 9.24707H12.4043V2.24707H8.4043V9.24707ZM6.4043 9.24707H2.4043V2.24707H6.4043V9.24707ZM6.4043 11.2471H2.4043V18.2471H6.4043V11.2471ZM14.4043 18.2471V11.2471H18.4043V18.2471H14.4043Z" fill="#838F9F"/>
                </svg>
                <div class="action__text">Доски</div>
            </router-link>
            <router-link to="/account/settings" class="action">
                <svg class="action__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2622 22.5613L21.681 20.1425L20.8291 17.0476L21.2002 16.1612L24.0011 14.5808V11.1602L21.2082 9.57314L20.8433 8.68831L21.7059 5.59182L19.2853 3.17478L16.1901 4.02643L15.3057 3.65561L13.7252 0.854492H10.3046L8.71755 3.64739L7.83292 4.01223L4.73693 3.14857L2.32015 5.56535L3.17194 8.66104L2.80112 9.54545L0 11.126V14.5456L2.79039 16.1362L3.15562 17.0218L2.29316 20.1178L4.71086 22.5354L7.80655 21.6837L8.69106 22.0545L10.2717 24.8545H13.6914L15.2808 22.064L16.1662 21.6989L19.2622 22.5613ZM19.4765 14.6285L18.5254 16.9001L19.2404 19.4974L18.6203 20.1175L16.0284 19.3955L13.7559 20.3327L12.4231 22.6726H11.5455L10.2238 20.3312L7.95479 19.3799L5.35603 20.0949L4.73697 19.4759L5.459 16.884L4.52183 14.6116L2.18192 13.2779V12.4002L4.52432 11.0784L5.47574 8.80928L4.76068 6.21052L5.37844 5.59275L7.97029 6.31578L10.2436 5.37821L11.5743 3.03641H12.451L13.7728 5.37881L16.0419 6.33023L18.6412 5.61503L19.2618 6.23473L18.5399 8.82608L19.4774 11.0992L21.8192 12.4299V13.3066L19.4765 14.6285ZM12.0006 17.2189C9.59047 17.2189 7.63671 15.2651 7.63671 12.855C7.63671 10.445 9.59047 8.49121 12.0006 8.49121C14.4106 8.49121 16.3644 10.445 16.3644 12.855C16.3644 15.2651 14.4106 17.2189 12.0006 17.2189ZM14.1825 12.855C14.1825 14.0601 13.2056 15.037 12.0006 15.037C10.7955 15.037 9.81863 14.0601 9.81863 12.855C9.81863 11.65 10.7955 10.6731 12.0006 10.6731C13.2056 10.6731 14.1825 11.65 14.1825 12.855Z" fill="#838F9F"/>
                </svg>
                <div class="action__text">Настройки аккаунта</div>
            </router-link>

            <div class="action" @click="$store.dispatch('user/logout')">
                <svg class="action__icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.98381 5.93513L11.2767 9.22803L0.690917 9.22803L0.690918 11.228L11.2767 11.228L7.98381 14.5209L9.39802 15.9351L15.1051 10.228L9.39802 4.52092L7.98381 5.93513ZM18.6909 0.228027L14.6909 0.228027L14.6909 2.22803L18.6909 2.22803L18.6909 18.228L14.6909 18.228L14.6909 20.228L18.6909 20.228C19.7955 20.228 20.6909 19.3326 20.6909 18.228L20.6909 2.22803C20.6909 1.12346 19.7955 0.228027 18.6909 0.228027Z" fill="#838F9F"/>
                </svg>
                <div class="action__text">Выход</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Avatar from "@/components/Avatar"
    import {mapGetters} from 'vuex'

    export default {
        name: 'AccountNavigationBar',
        computed: mapGetters({
            user: ['user/getUser']
        }),
        components: {Avatar},
    }
</script>

<style lang="scss" scoped>
    .profile {width: 19.8%;}
    .profile__user {
        @include flex(initial, center);
        margin: 0 0 2.5rem 0;
    }
    .user__wrapper {margin: 0 0 0 .9375rem;}
    .user__name {
        @include font-size(18);
        color: $primary-text;
    }
    .user__email {
        @include font-size(16);
        color: $color-gray;
    }
    .profile__actions {@include flex(initial, initial, column)}
    .action {
        @include flex(initial, center);
        cursor: pointer;
        margin: 0 0 1.77083rem 0;
        &:last-child {margin: 0;}
        @extend .path-hover;
    }
    .action__icon {
        width: 1.25rem;
        height: 1.25rem;
        margin: 0 .46875rem 0 0;
    }
    .action__text {
        @include font-size(18);
        color: $primary-text;
    }

    @media only screen and (max-width: 768px) {
        .profile {display: none;}
    }
</style>
