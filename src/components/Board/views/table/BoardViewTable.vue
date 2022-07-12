<template>
    <div class="board__projects container">
        <div class="table-head">
            <span @click="sort(filter.id)" v-for="(filter, i) of filters" :key="i" :class="`${filter.class} table-col-head`">{{filter.title}}
                <i v-if="filter.sort === ASCENDING" class="table-filter-icon el-icon-sort-up"></i>
                <i v-else-if="filter.sort === DESCENDING" class="table-filter-icon el-icon-sort-down"></i>
                <i v-else class="table-filter-icon el-icon-sort"></i>
            </span>
        </div>
        <Task v-for="(task, i) of tasks" :key="i" :task="task"/>
    </div>
</template>

<script lang="ts">

import {Component, Vue, Prop} from 'vue-property-decorator'
import Task from "@/components/Board/views/table/Task.vue"
import {commit, getters} from '@/store'
import {filters, FilterTask, FilterType, FilterSort} from "@/components/Board/views/table/filter"
import {sortByABC} from "@/helpers/utils"
import {Board} from "@/interfaces/board"
import {Task as ITask} from '@/interfaces/task'
const {ASCENDING, DESCENDING} = FilterSort

@Component({
    components: {Task}
})
export default class BoardViewTable extends Vue {

    ASCENDING = ASCENDING
    DESCENDING = DESCENDING

    private filters: FilterTask[] = filters

    private get isTablet() {return getters['viewport/isTablet']}
    private get board(): Board {return getters['board/getBoard']}
    private get tasks(): ITask[] {return getters['task/getTasks']}

    public sort(id: string): void {
        this.filters = this.filters.map(f => {
            if (f.id !== id) f.sort = null
            return f
        })

        const filter = this.filters.find(f => f.id === id)

        const type = filter.type
        const sort = filter.sort

        let tasks = JSON.parse(JSON.stringify(this.board.tasks))
        if (type === FilterType.TEXT) {
            const slug = filter.slug

            if (slug === 'responsible') {
                tasks = tasks.filter(t => t.responsible?.fullName).sort((a, b) => {
                    if (a.responsible?.fullName > b.responsible?.fullName) return 1
                    if (a.responsible?.fullName < b.responsible?.fullName) return -1
                    return 0
                })
            } else tasks = sortByABC(tasks, slug)
        }
        if (type === FilterType.DATE)
            tasks = tasks.filter(t => t.term).sort((a, b) => <any>new Date(b.term) - <any>new Date(a.term))

        if (!sort) filter.sort = ASCENDING

        if (sort === ASCENDING) {
            filter.sort = DESCENDING
            tasks.reverse()
        }

        if (sort === DESCENDING) filter.sort = ASCENDING

        commit('task/setTasks', tasks)
    }

}
</script>

<style scoped lang="scss">
.table {
    width: 100%;
    @include flex(initial, initial, column);
    &:nth-of-type(5n + 5) {margin-right: 0;}
}
.table-head {
    display: flex;
    padding: .5rem .833rem .5rem .5rem;
    position: sticky;
    top: 0;
    background-color: #F9F9F9;
    z-index: $position-def-index;
}
.table-col-head {
    @include font-size(18);
    color: #8B8E9F;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: $transition-default;
    &:hover {color: $color-sky}
}
.table-wrapper {
    @include flex(initial, center);
    @extend .path-hover;
    width: max-content;
    cursor: pointer;
    padding: 0 .5rem;
    margin: 0 auto;
}

@media only screen and (max-width: 480px) {
    .project {width: 100%;}
    .table-col-head {@include font-size(16);}
}
</style>

