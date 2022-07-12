<template>
    <div>
        <label class="field-label" :for="id">{{label}}</label>
        <input v-if="type !== 'password'" :maxlength="maxlength" :readonly="readonly" @focusout="$emit('reset')" @focus="$emit('reset')" :style="{width: !isTablet ? width : '100%'}" :id="id" @input="valueField" v-model="input" class="field-input" :placeholder="placeholder" :type="type">
        <div class="password-field" v-if="type === 'password'">
            <img @click="switchFieldType" class="password-icon" src="@/assets/icon/password_eye.svg"/>
            <input @focusout="$emit('reset')" @focus="$emit('reset')" :style="{width: !isTablet ? width : '100%'}" :id="id" @input="valueField" v-model.trim="input" class="field-input" type="password" :placeholder="placeholder">
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: 'InputField',
    watch: {
        'value': function (newValue) {
            this.input = newValue
            this.$emit('value', this.input)
        }
    },
    props: {
        readonly: {
            type: Boolean,
            required: false,
            default: () => false
        },
        value: {
            type: String,
            required: true
        },
        width: {
            type: String
        },
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: () => 'text'
        },
        placeholder: {
            type: String,
            default: () => ''
        },
        label: {
            type: String,
            default: () => ''
        },
        maxlength: {
            type: [Number, String],
            default: () => null
        }
    },
    data: () => ({input: ''}),
    computed: mapGetters({
        isTablet: ['viewport/isTablet']
    }),
    methods: {
        switchFieldType() {
            const pass = document.getElementById(this.id)
            const type = pass.getAttribute('type')
            type === 'password' ? pass.setAttribute('type', 'text') : pass.setAttribute('type', 'password')
        },
        valueField() {
            this.$emit('value', this.input)
            this.$emit('reset')
        }
    },
    created() {
        this.input = this.value
        this.$emit('value', this.input)
    }
}
</script>

<style scoped>
.password-field {
    width: max-content;
    position: relative !important;
}
.password-icon {
    width: 1.1458rem;
    position: absolute;
    top: .7rem;
    right: 1.14583rem;
    cursor: pointer;
}
@media only screen and (max-width: 768px) {
    .password-field {width: 100%;}
}
</style>
