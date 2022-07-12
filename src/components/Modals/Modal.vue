<template>
    <ModalLayer v-if="render" @close="switchRender">
        <ModalForm :style="{width}">
            <div class="form-wrapper">
                <div class="modal-form-title">{{title}}</div>
                <ModalCloseBtn @click.native="switchRender"/>
            </div>
            <slot></slot>
        </ModalForm>
    </ModalLayer>
</template>

<script lang="ts">
const ModalLayer = () => import('@/components/Modals/ModalLayer.vue')
const ModalForm = () => import('@/components/Modals/Elements/ModalForm.vue')
const ModalCloseBtn = () => import('@/components/Modals/Elements/ModalCloseBtn.vue')

import Vue from 'vue'
import {Prop} from 'vue-property-decorator'
import Component from "vue-class-component"

@Component({
    components: {ModalLayer, ModalForm, ModalCloseBtn}
})
export default class Modal extends Vue {

    @Prop()
    private title: string

    @Prop({type: String, default: () => null})
    private width: string

    private render: boolean = false

    switchRender(): void {
        this.render = !this.render
    }

    created() {
        this.$root.$on('render', ({ctx, value}) => {
            if (this.$parent.$vnode.tag !== ctx) return
            this.render = value
        })
    }

}
</script>
