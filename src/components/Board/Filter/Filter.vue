<template>
    <div v-if="!isTablet" class="board__filters container">
        <el-select class="filter__projects" v-if="representation === BOARD_REPRESENTATION.GRID" @remove-tag="run" @change="run" v-model="value" size="mini" multiple filterable allow-create default-first-option placeholder="Выберите проекты">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-date-picker class="filter__date" @change="run" :picker-options="pickerOptions" size="mini" v-model="date" type="daterange" range-separator="-" start-placeholder="Начальная дата" end-placeholder="Конечная дата"></el-date-picker>
        <el-button class="filter__btn" @click.native="reset" size="mini" round type="primary">Сбросить фильтр</el-button>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {commit, getters} from '@/store'
import {Project} from "@/interfaces/project"
import {Board} from "@/interfaces/board"
import {BOARD_REPRESENTATION} from "@/config/app"
import {pickerOptions} from "@/components/Board/Filter/calendar"
import {Task} from "@/interfaces/task";
const {GRID, TABLE} = BOARD_REPRESENTATION

@Component
export default class BoardFilters extends Vue {

    @Watch('board')
    boardWatch() {
        const projects: string[] = this.projects
            .filter((p: Project) => p.id && p.tasks.length)
            .map((p: Project) => p.title)
        this.options = projects.map(p => ({value: p, label: p}))
    }

    private value: string[] | null = []
    private date: string[] | null = []
    private pickerOptions = pickerOptions
    private options = []

    private get projects(): Project[] {return getters['project/getProjects']}
    private get board(): Board {return getters['board/getBoard']}
    private get representation(): string {return getters['tab/getRepresentationActive']}
    private get isTablet(): string {return getters['viewport/isTablet']}

    public run(): void {
        if (this.representation === GRID) {
            const projects: Project[] = JSON.parse(JSON.stringify(this.board.projects)).filter((p: Project) => {
                if (this.date?.length)
                    p.tasks = p.tasks
                        .filter(t => new Date(t.term) >= new Date(this.date[0]) && new Date(t.term) <= new Date(this.date[1]))

                if (this.value.length)
                    return this.value.includes(p.title) && p.id
                else return true
            })

            commit('project/setProjects', <Project[]>projects)
        }

        if (this.representation === TABLE) {
            const tasks: Task[] = JSON.parse(JSON.stringify(this.board.tasks))
                .filter(t => new Date(t.term) >= new Date(this.date?.length ? this.date[0] : null) && new Date(t.term) <= new Date(this.date?.length ? this.date[1] : null))
            commit('task/setTasks', <Task[]>tasks)
        }
    }

    public reset(): void {
        if (this.representation === GRID) {
            const projects: Project[] = JSON.parse(JSON.stringify(this.board.projects))
            projects.unshift(<Project>{title: '', tasks: this.board.tasks})
            commit('project/setProjects', <Project[]>projects)
        }

        if (this.representation === TABLE) {
            const tasks: Task[] = JSON.parse(JSON.stringify(this.board.tasks))
            commit('task/setTasks', <Task[]>tasks)
        }

        this.value = []
        this.date = []
    }

}

</script>

<style scoped lang="scss">

.board__filters {
    padding: 0 0 1rem 0;
}

.filter__projects {
    width: 100%;
    margin: 0 0 1rem 0;
}

.filter__date {
    margin: 0 0 1rem 0;
}

.filter__btn {
 display: block;
}

</style>
