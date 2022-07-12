<template>
    <BaseAuthTemplate>
        <form autocomplete="off" @submit.prevent="login">
            <div>
                <h2 class="form__title">Вход</h2>

                <InputField @reset="reset" :value="email" width="25rem" id="email" type="email" label="E-mail" placeholder="Example@gmail.com" @value="setEmail"/>
                <InputField @reset="reset" :value="password" width="25rem" id="password" type="password" label="Пароль" placeholder="···············" @value="setPassword"/>

                <div v-if="err.email" class="form__error">{{err.email[0]}}</div>
                <div v-if="err.message" class="form__error">{{err.message}}</div>
                <div v-if="err.detail" class="form__error">{{err.detail}}</div>

                <div class="form-control">
                    <button :disabled="disabled" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" ref="btn" class="btn-sky" type="submit">Войти</button>
                    <router-link class="btn-form-action-enable" :to="{name: 'passwordRestore'}">Забыли пароль?</router-link>
                </div>
            </div>
            <span>
                <router-link class="form__link btn-form-action-enable" :to="{name: 'signup'}">Нет аккаунта? Зарегистрируйтесь</router-link>
            </span>
        </form>
    </BaseAuthTemplate>
</template>
<script>
import BaseAuthTemplate from '@/components/Auth/BaseAuthTemplate'
import InputField from '@/components/Auth/Elements/InputField'
import {dispatch} from '@/store'

export default {
    data: () => ({
        email: '',
        password: '',
        // email: 'admin@admin.com',
        // password: 'Qwezxc123',
        err: {},
        loading: false,
        disabled: false
    }),
    methods: {
        setEmail(value) {this.email = value},
        setPassword(value) {this.password =  value},
        login() {
            this.loading = true
            this.disabled = true
            const user = {email: this.email, password: this.password}

            dispatch('user/login', user)
                .then(() => location.replace('/boards'))
                .catch(err => {
                    this.err = err
                    this.disabled = false
                }).finally(() => this.loading = false)
        },
        reset() {
            const btn = this.$refs['btn']
            this.email && this.password ? btn.disabled = false : btn.disabled = true
            this.err = {}
        }
    },
    mounted() {this.reset()},
    components: {InputField, BaseAuthTemplate}
}
</script>
