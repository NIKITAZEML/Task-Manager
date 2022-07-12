<template>
    <Modal title="Справочник">
        <Directory/>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from "vue-class-component"
import {ModalWindow} from "@/components/Modals/modal"
import Modal from "@/components/Modals/Modal.vue"

import {EventBus} from "@/main"
import {EventSystem} from "@/config/event"
import Directory from "@/components/Modals/Elements/Directory.vue"
import {dispatch} from '@/store'

@Component({
    components: {Directory, Modal}
})
export default class ModalDirectory extends mixins(ModalWindow) {



    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_DIRECTORY, () => {
            dispatch('directory/getDirectory')
            this.open()
        })
        console.log('test')
    }

}
</script>
