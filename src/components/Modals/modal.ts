import Vue from 'vue'
import Component from 'vue-class-component'
import {Watch} from 'vue-property-decorator'

export interface ModalRenderArgs {
    value: boolean
    ctx: string
}

@Component
export class ModalWindow extends Vue {

    @Watch('$route.path')
    routeWatch() {
        this.close()
    }

    private ctx: string = this.$vnode.tag

    protected open(): void {
        this.$root.$emit('render', <ModalRenderArgs>{
            value: true,
            ctx: this.ctx
        })
    }

    protected close(): void {
        this.$root.$emit('render', <ModalRenderArgs>{
            value: false,
            ctx: this.ctx
        })
    }

    beforeDestroy() {
        this.$root.$off('render')
    }

}
