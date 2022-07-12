<template>
    <div class="board" v-loading.fullscreen.lock="loading">
        <BoardPanel/>
        <BoardSubPanel/>
        <BoardFilters/>
        <div class="board__body container">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import BoardPanel from "@/components/Board/BoardPanel.vue"
import BoardSubPanel from "@/components/Board/BoardSubPanel.vue"
import BoardFilters from "@/components/Board/Filter/Filter.vue"
import {mapGetters} from 'vuex'
import {dispatch} from '@/store'
import {Board} from "@/interfaces/board"

@Component({
    computed: {
        id() {return this.$route.params.id},
        ...mapGetters('board', {board: 'getBoard'})
    },
    components: {BoardPanel, BoardSubPanel, BoardFilters}
})
export default class BoardTemplate extends Vue {

    private id: number
    private loading: boolean = true
    private board: Board

    created() {
        dispatch('board/getUsers', this.id)
        dispatch('task/getIcons')
        dispatch('board/getById', this.id)
            .then(res => this.$gates.setRoles([this.board.role]))
            .catch(err => {
                this.$message.warning({message: err.detail, duration: 3000})
                this.$router.push('/boards')
            })
            .finally(() => this.loading = false)
    }

}
</script>

<style scoped lang="scss">
.board {
    background-color: $primary-bg;
    min-height: 100vh;
}
</style>
