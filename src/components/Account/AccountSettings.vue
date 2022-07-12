<template>
    <form class="settings" @submit.prevent="update" v-loading="loading">
        <AccountTitle>Настройки аккаунта</AccountTitle>
        <AccountSubtitle>Персональные данные</AccountSubtitle>
        <InputField v-if="user.variety === 'org'" :value="user.title || ''" @value="props => title = props" maxlength="200" width="18.5rem" id="title" label="Организация" placeholder="Организация"/>
        <div v-if="user.variety === 'people'" class="form-space-wrapper">
            <InputField :value="user.first_name || ''" @value="setFirstname" maxlength="15" width="18.5rem" id="firstname" label="Имя" placeholder="Иван"/>
            <InputField :value="user.last_name || ''" @value="setLastname" maxlength="30" width="19.8rem" id="lastname" label="Фамилия" placeholder="Иванов"/>
        </div>
        <InputField v-if="user.variety === 'people'" :value="user.father_name || ''" @value="setFathername" width="18.5rem" id="fathername" label="Отчество" placeholder="Иванович"/>
        <InputField :value="user.email || ''" @value="setEmail" width="24.9rem" id="email" type="email" label="E-mail" placeholder="Example@gmail.com" :readonly="true"/>
        <InputField v-if="user.variety === 'people'" :value="user.subdivision || ''" @value="setDivision" width="100%" id="division" label="Подразделение" placeholder="Подразделение"/>
        <InputField v-if="user.variety === 'people'" :value="user.position || ''" @value="setPosition" width="100%" id="position" label="Должность" placeholder="Должность"/>

        <AccountSubtitle>Изменить пароль</AccountSubtitle>
        <InputField :value="password" @value="setPassword" width="18.5rem" id="password" type="password" label="Придумайте пароль" placeholder="···············"/>
        <InputField :value="passwordConfirm" @value="setPasswordConfirm" width="18.5rem" id="passwordConfirm" type="password" label="Подтвердите пароль" placeholder="···············"/>
        <div @click="refreshPassword" class="save-password">Сохранить новый пароль</div>

        <AccountSubtitle/>

        <button class="btn-sky" type="submit">Сохранить</button>
    </form>
</template>

<script>
import AccountSubtitle from "@/components/Account/AccountSubtitle"
import AccountTitle from "@/components/Account/AccountTitle"
import InputField from "@/components/Auth/Elements/InputField"
import {mapGetters} from 'vuex'
import {dispatch} from '@/store'

export default {
    name: 'AccountSettings',
    data: () => ({
        title: '',
        firstname: '',
        lastname: '',
        fathername: '',
        email: '',
        division: '',
        position: '',
        password: '',
        passwordConfirm: '',
        loading: false
    }),
    computed: mapGetters({
        user: ['user/getUser']
    }),
    methods: {
        setFirstname(value) {this.firstname = value},
        setLastname(value) {this.lastname = value},
        setFathername(value) {this.fathername = value},
        setEmail(value) {this.email = value},
        setDivision(value) {this.division = value},
        setPosition(value) {this.position = value},
        setPassword(value) {this.password = value},
        setPasswordConfirm(value) {this.passwordConfirm = value},
        getParams() {
            const title = this.title
            const first_name = this.firstname
            const last_name = this.lastname
            const father_name = this.fathername
            const email = this.email
            const subdivision = this.division
            const position = this.position
            return {title, first_name, last_name, father_name, email, subdivision, position}
        },
        update() {
            this.loading = true
            const user = this.getParams()
            dispatch('user/updateProfile', user)
                .then(() => this.$message.success({message: 'Настройки были обновлены'}))
                .catch(res => this.$message.error({message: 'Ошибка обновления настроек'}))
                .finally(() => this.loading = false)
        },
        refreshPassword() {
            const password = this.password
            const password_confirm = this.passwordConfirm
            const payload = {password, password_confirm}

            if (this.password && this.passwordConfirm) {
                this.loading = true
                dispatch('user/refreshPassword', payload)
                    .then(res => {
                        this.$message.success({message: res.detail})
                        this.password = this.passwordConfirm = ''
                    })
                    .catch(e => this.$message.error({message: e.detail}))
                    .finally(() => this.loading = false)
            }
            else this.$message.error({message: 'Не заполнены поля для обновления пароля'})
        }
    },
    components: {InputField, AccountTitle, AccountSubtitle}
}
</script>

<style lang="scss" scoped>
    .save-password {
        @include font-size(18);
        color: $color-sky;
        cursor: pointer;
        margin: 0 0 2.39583rem 0;
    }
</style>
