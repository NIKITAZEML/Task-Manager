<template>
    <BaseAuthTemplate>
        <form autocomplete="off" @submit.prevent="signup">
            <div>
                <h2 class="form__title">Регистрация</h2>

                <el-tabs :value="variety" type="card" @tab-click="changeType">
                    <el-tab-pane name="person" label="Пользователь">
                        <div class="form__wrapper">
                            <InputField @reset="reset" :value="firstname" width="12.8rem" id="firstname" type="text" label="Ваше Имя" placeholder="Иван" @value="setFirstname"/>
                            <InputField @reset="reset" :value="lastname" width="17.4rem" id="lastname" type="text" label="Фамилия" placeholder="Иванов" @value="setLastname"/>
                        </div>

                        <InputField @reset="reset" :value="fathername" width="23rem" id="fathername" type="text" label="Отчество" placeholder="Иванович" @value="setFathername"/>

                    </el-tab-pane>
                    <el-tab-pane name="org" label="Организация">
                        <InputField @reset="reset" :value="title" width="23rem" id="title" type="text" label="Название организации" placeholder="Введите название организации" @value="props => title = props"/>
                    </el-tab-pane>
                </el-tabs>

                <InputField @reset="reset" :value="email" width="23rem" id="email" type="email" label="E-mail" placeholder="Example@gmail.com" @value="setEmail"/>
                <InputField @reset="reset" :value="password" width="23rem" id="password" type="password" label="Придумайте пароль" placeholder="···············" @value="setPassword"/>
                <InputField @reset="reset" :value="passwordCopy" width="23rem" id="passwordCopy" type="password" label="Повторите пароль" placeholder="···············" @value="setPasswordCopy"/>

                <div v-if="err.email" class="form__error">{{err.email[0]}}</div>
                <div v-if="err.message" class="form__error">{{err.message}}</div>
                <div v-if="err.detail" class="form__error">{{err.detail}}</div>

                <div class="form__confirm">
                    <el-checkbox class="form__checkbox" id="confirm" @change="reset" v-model="confirm"/>
                    <label class="confirm__label" for="confirm">Принимаю <span>правила обработки персональных данных</span></label>
                </div>

                <div @click="reset">
                    <button :disabled="disabled" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)" ref="btn" class="btn-sky" type="submit">Зарегистрироваться</button>
                </div>
            </div>

            <span>
                <router-link class="link btn-form-action-enable" :to="{name: 'login'}">Уже есть аккаунт? Войдите</router-link>
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
        variety: 'person',
        title: '',
        email: '',
        password: '',
        passwordCopy: '',
        firstname: '',
        lastname: '',
        fathername: '',
        confirm: false,
        err: {},
        loading: false,
        disabled: false
    }),
    methods: {
        setEmail(value) {this.email = value},
        setPassword(value) {this.password =  value},
        setPasswordCopy(value) {this.passwordCopy =  value},
        setFirstname(value) {this.firstname =  value},
        setLastname(value) {this.lastname =  value},
        setFathername(value) {this.fathername =  value},
        changeType({name}) {
            this.variety = name
        },
        getUserParams() {
            const {variety, email, password} = this
            const first_name = this.firstname
            const last_name = this.lastname
            const father_name = this.fathername
            const password_confirm = this.passwordCopy
            return {variety, email, password, password_confirm, first_name, last_name, father_name}
        },
        getOrganizationParams() {
            const {variety, email, password, title} = this
            const password_confirm = this.passwordCopy
            return {variety, title, email, password, password_confirm}
        },
        signup() {
            this.loading = true
            this.disabled = true

            let entity = null
            if (this.variety === 'person') entity = this.getUserParams()
            if (this.variety === 'org') entity = this.getOrganizationParams()

            dispatch('user/signup', entity).then(entity => {
                let message = null
                if (this.variety === 'person') message = `Пользователь ${entity.email} был успешно зарегистрирован. Вы будете перенаправлены на страницу авторизации через 5 секунд.`
                if (this.variety === 'org') message = `Организация с email ${entity.email} была успешно зарегистрирована. Вы будете перенаправлены на страницу авторизации через 5 секунд.`
                this.$message.success({message, duration: 5000})
                setTimeout(() => this.$router.push({name: 'login'}), 5000)
            }).catch((err) => {
                this.err = err
                this.disabled = false
            }).finally(() => this.loading = false)
        },
        reset() {
            const btn = this.$refs['btn']
            const {title, email, password, passwordCopy, firstname, lastname, confirm} = this
            if (this.variety === 'person')
                email && password && passwordCopy && firstname && lastname && confirm ? btn.disabled = false : btn.disabled = true
            if (this.variety === 'org')
                email && password && passwordCopy && title && confirm ? btn.disabled = false : btn.disabled = true
            this.err = {}
        }
    },
    mounted() {this.reset()},
    components: {InputField, BaseAuthTemplate}
}
</script>

<style lang="scss">
.link {
    display: block;
    margin-top: 3rem;
}
.form__wrapper {
    width: 31.2rem;
    @include flex(space-between, center);
}
.form__confirm {
    @include flex(initial, center);
    margin: 0 0 2.1875rem 0;
}
.form__checkbox {
    cursor: pointer;
    margin: 0 .4rem 0 0;
}
.confirm__label {
    @include font-size(18);
    span {color: $color-sky;}
}

.el-tabs__item {
    padding: 1rem 1.5rem;
    height: initial;
    line-height: initial;
    @include font-size(18);
}

@media only screen and (max-width: 768px) {
    .form__wrapper {
        width: 100%;
        display: block;
    }
    .form__confirm {
        @include flex(initial, flex-start);
    }
}
</style>
