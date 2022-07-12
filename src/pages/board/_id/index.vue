<template>
    <BoardTemplate>
        <BoardViewGrid v-if="representation === GRID"/>
        <BoardViewTable v-else-if="representation === TABLE"/>
        <div v-else>Задач в выбранном фильтре не найдено</div>
    </BoardTemplate>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import BoardTemplate from "@/components/Board/BoardTemplate.vue"
import BoardViewTable from "@/components/Board/views/table/BoardViewTable.vue"
import BoardViewGrid from "@/components/Board/views/grid/BoardViewGrid.vue"
import {commit, getters} from '@/store'
import {BOARD_REPRESENTATION} from '@/config/app'

@Component({
    components: {BoardTemplate, BoardViewGrid, BoardViewTable}
})
export default class BoardById extends Vue {

    TABLE = BOARD_REPRESENTATION.TABLE
    GRID = BOARD_REPRESENTATION.GRID

    protected get representation(): string {return getters['tab/getRepresentationActive']}

    beforeRouteLeave(to, from, next) {
        document.body.style.zoom = '1'
        commit('board/setBoard', {})
        commit('project/setProjects', [])
        commit('task/setTasks', [])
        next()
    }
}
</script>
