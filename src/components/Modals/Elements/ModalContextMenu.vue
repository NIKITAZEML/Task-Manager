<template>
    <el-dropdown class="ctx" type="primary" placement="top-end">
        <el-button size="medium" icon="el-icon-more" circle></el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="remove" v-role="Role.ADMIN" v-if="action === 'update'" icon="el-icon-delete">Удалить</el-dropdown-item>
            <el-dropdown-item @click.native="EventBus.$emit(EventSystem.SWITCH_MODAL_MOVE_TASK)" icon="el-icon-right">Переместить</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script lang="ts">

import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class ModalContextMenu extends Vue {

    @Prop({type: String, default: () => null})
    private action: string

    private remove() {this.$emit('remove')}

}

</script>

<style scoped lang="scss">
.ctx {margin: 0 0 0 1rem;}
</style>
