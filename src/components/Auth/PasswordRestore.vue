<template>
    <BaseAuthTemplate>
        <form v-if="stepRestore === 1" @submit.prevent="requestPasswordRestore">
            <div>
                <h2 class="form__title">Восстановление пароля</h2>
                <p class="form__desc">Укажите ваш e-mail, мы вышлем ссылку на восстановление пароля</p>
                <InputField @reset="resetEmail" width="23rem" :value="email" @value="setEmail" id="email" label="E-mail" placeholder="Example@gmail.com"/>
                <button :disabled="disabled" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" class="btn-sky" type="submit">Отправить</button>
            </div>
            <span>
                <router-link class="form__link btn-form-action-enable" :to="{name: 'signup'}">Нет аккаунта? Зарегистрируйтесь</router-link>
            </span>
        </form>

        <form v-if="stepRestore === 2" @submit.prevent="definitionPassword">
            <div>
                <h2 class="form__title">Восстановление пароля</h2>
                <p class="form__desc">Задайте новый пароль</p>
                <InputField @reset="resetPassword" width="23rem" :value="password" type="password" @value="setPassword" id="password" label="Придумайте пароль" placeholder="···············"/>
                <InputField @reset="resetPassword" width="23rem" :value="passwordCopy" type="password" @value="setPasswordCopy" id="passwordCopy" label="Повторите пароль" placeholder="···············"/>
                <button :disabled="disabled" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" class="btn-sky" type="submit">Сохранить пароль</button>
            </div>
            <span>
                <router-link class="form__link btn-form-action-enable" :to="{name: 'signup'}">Нет аккаунта? Зарегистрируйтесь</router-link>
            </span>
        </form>

        <form v-if="stepRestore === 3" @submit.prevent="$router.push({name: 'login'})">
            <div>
                <h2 class="form__title">Пароль успешно восстановлен</h2>
                <p class="form__desc">Для входа используйте новый пароль</p>
                <button class="btn-sky" type="submit">Перейти на страницу входа</button>
            </div>
        </form>
    </BaseAuthTemplate>
</template>

<script>
import BaseAuthTemplate from "@/components/Auth/BaseAuthTemplate"
import InputField from "@/components/Auth/Elements/InputField"
import api from "@/helpers/http/api.ts"
export default {
    name: 'PasswordRestore',
    data: function () {
        return {
            stepRestore: 1, // :number => 1 || 2 || 3
            email: '',
            password: '',
            passwordCopy: '',
            user_id: this.$route.query.user_id || null,
            timestamp: this.$route.query.timestamp || null,
            signature: this.$route.query.signature || null,
            loading: false,
            disabled: false
        }
    },
    methods: {
        setEmail(value) {this.email = value},
        setPassword(value) {this.password = value},
        setPasswordCopy(value) {this.passwordCopy = value},
        requestPasswordRestore() {
            const email = this.email
            this.loading = true
            this.disabled = true
            api.post('/send-mail-password-reset/', {email}, {headers: {'Authorization': ''}})
                .then(payload => {
                    const res = payload.data
                    if (res.success)
                        this.$confirm(res.detail, 'Восстановление пароля', {
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Закрыть',
                            type: 'success'
                        })
                })
                .catch(e => {
                    const res = e.response.data
                    this.$confirm(res.detail, 'Ошибка', {
                        confirmButtonText: 'На главную',
                        cancelButtonText: 'Попробовать снова',
                        type: 'error'
                    }).then(() => this.$router.push('/'))
                })
                .finally(() => {
                    this.email = ''
                    this.resetEmail()
                    this.loading = false
                    this.disabled = false
                })
        },
        definitionPassword() {
            if (this.password === this.passwordCopy) {
               this.loading = true
                this.disabled = true

                const user_id = this.user_id
                const timestamp = this.timestamp
                const signature = this.signature
                const password = this.password

                const params = {user_id, timestamp, signature, password}

                api.post('/password-reset/', params, {headers: {'Authorization': ''}})
                    .then(payload => {
                        console.log(payload, 'ss')
                        const res = payload.data
                        this.$alert(res.detail, 'Восстановление пароля', {
                            confirmButtonText: 'OK',
                            callback: () => this.stepRestore = 3
                        })
                    })
                    .catch(e => {
                        console.log(e, 'err')
                        const res = e.response.data
                        this.$confirm(res.detail, 'Ошибка', {
                            confirmButtonText: 'На главную',
                            cancelButtonText: 'Попробовать снова',
                            type: 'error'
                        }).then(() => this.$router.push('/'))
                    })
                    .finally(() => {
                        this.password = this.passwordCopy = ''
                        this.resetPassword()
                        this.loading = false
                        this.disabled = false
                    })
            }
            else this.$message.error({message: 'Введенные пароли не совпадают'})
        },
        resetEmail() {this.email ? this.disabled = false : this.disabled = true},
        resetPassword() {this.password && this.passwordCopy ? this.disabled = false : this.disabled = true}
    },
    mounted() {
        this.resetEmail()
        this.resetPassword()
    },
    created() {
        const {user_id, signature, timestamp} = this
        if (user_id && signature && timestamp) {
            this.stepRestore = 2
        }
    },
    components: {InputField, BaseAuthTemplate},
}
</script>

<style lang="scss" scoped>
    .form__title {margin: 0 0 .5rem 0;}
    .form__desc {
        width: 18rem;
        @include font-size(18);
        margin: 0 0 1.25rem 0;
    }
</style>
