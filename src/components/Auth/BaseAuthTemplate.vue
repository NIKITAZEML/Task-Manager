<template>
    <div class="auth__template">
        <div class="base-container heading">
            <AppLogo/>
            <RedirectTo v-if="!isTablet" :text="'Вернуться к лендингу'"/>
            <RedirectTo v-if="isTablet" :text="'Лендинг'"/>
        </div>

        <div class="auth__bg">
            <img class="column__bg" src="@/assets/auth-bg.svg"/>
        </div>

        <div v-if="!isTablet" class="auth__content"><slot></slot></div>
        <div v-if="isTablet" class="base-container auth__content"><slot></slot></div>
    </div>
</template>

<script>
    import AppLogo from "@/components/AppLogo"
    import RedirectTo from "@/components/Buttons/RedirectTo"
    import {mapGetters} from 'vuex'
    export default {
        name: 'BaseAuthTemplate',
        computed: mapGetters({
            isTablet: ['viewport/isTablet']
        }),
        components: {RedirectTo, AppLogo}
    }
</script>

<style lang="scss" scoped>
    .auth__template {
        @include flex();
        position: relative;
        height: 100vh;
    }
    .heading {
        @include flex(space-between, center);
        position: absolute;
        top: 2.7083rem;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .auth__bg {
        width: 53.6%;
        height: 100%;
    }
    .column__bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .auth__content {
        @include flex(center, initial, column);
        padding: 0 0 0 2.083rem;
    }
    .form__title {
        @include font-size(28);
        margin: 0 0 2.864583rem 0;
    }
    .form__link {
      display: block;
      margin-top: 13.02083rem;
    }
    .form__error {
        @include font-size(14);
        color: $color-red;
        margin: 0 0 1rem 0;
    }

    @media only screen and (max-width: 768px) {
      form {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .auth__template {
        flex-direction: column;

      }
      .auth__bg {
        display: none;
      }
      .auth__content {
        flex-grow: 3;
        padding: 0;
      }
      .heading {
        position: static;
        margin: 1.5625rem auto;
      }
      .form-link {
        background-color: red;
      }
      span > a {
        display: block;
        width: 50%;
        margin: 0 auto 1rem auto !important;
        text-align: center;
      }
      .btn-sky {
        width: 100%;
        margin: 0 0 1rem 0;
      }
      .form-control {
        flex-direction: column;
      }

    }
</style>
