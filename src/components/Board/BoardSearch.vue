<template>
    <div class="search-layer">
        <input @keydown.esc="value = ''" ref="search" v-model="value" class="search" type="text" placeholder="Поиск задач">
        <img v-if="!value" class="search-icon" src="@/assets/icon/search.svg"/>
        <svg v-if="value" @click="value = ''" class="search-clear" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.94883 0.496826L0.548828 1.89683L6.14883 7.49683L0.548828 13.0968L1.94883 14.4968L7.54883 8.89683L13.1488 14.4968L14.5488 13.0968L8.94883 7.49683L14.5488 1.89683L13.1488 0.496826L7.54883 6.09683L1.94883 0.496826Z" fill="#838F9F"/>
        </svg>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {EventBus} from "@/main"
import {BOARD_REPRESENTATION} from '@/config/app'
import {EventSystem} from "@/config/event.ts"
import {commit, getters} from '@/store'
import {Board} from "@/interfaces/board"
import {Project} from "@/interfaces/project"
import {Task} from "@/interfaces/task"

@Component
export default class BoardSearch extends Vue {

    private get representation(): string {return getters['tab/getRepresentationActive']}
    private get board(): Board {return getters['board/getBoard']}
    private value: string = ''

    @Watch('value')
    public search(): void {
        const regExp: RegExp = new RegExp(this.value, 'i')

        if (this.representation === BOARD_REPRESENTATION.GRID)
            this.searchInGridRepresentation(<RegExp>regExp)

        if (this.representation === BOARD_REPRESENTATION.TABLE)
            this.searchInTableRepresentation(<RegExp>regExp)
    }

    public searchInGridRepresentation(regExp: RegExp): void {
        let projects: Project[] = JSON.parse(JSON.stringify(<Project[]>this.board.projects))
        projects = projects.filter((project: Project) => {
            const {title, tasks} = project
            if (regExp.test(title))
                return true
            else {
                if (tasks.length) {
                    project.tasks = tasks.filter((task: Task) => {
                        const {executors, title, responsible} = task
                        const users = executors.filter(e => regExp.test(e.fullName)) || []
                        return regExp.test(title) || regExp.test(responsible?.fullName ?? '') || users.length
                    })
                    if (project.tasks.length)
                        return true
                }
                return false
            }
        })
        commit('project/setProjects', <Project[]>projects)
    }

    public searchInTableRepresentation(regExp: RegExp): void {
        const tasks: Task[] = [...this.board.tasks].filter((task: Task) => {
            const {project, title, responsible} = task
            return regExp.test(project) || regExp.test(title) || regExp.test(responsible?.fullName ?? '')
        })
        commit('task/setTasks', <Task[]>tasks)
    }

    created() {
        EventBus.$on(EventSystem.BOARD_CLEAR_SEARCH, () => this.value = '')
    }

}

</script>

<style lang="scss" scoped>
    .search-layer {@include position(relative);}
    .search {
        width: 23.22916rem;
        height: 2.1875rem;
        @include font-size(16);
        text-indent: .5rem;
        color: $primary-text;
        border: 1px solid $color-gray;
        border-radius: 16px;
    }
    .search-icon {
        width: 1.0416rem;
        height: 1.0416rem;
        @include position(absolute, 92%, 25%);
        pointer-events: none;
    }
    .search-clear {
        @extend .search-icon;
        cursor: pointer;
        pointer-events: auto;
        transition: $transition-default;
        path {transition: inherit;}
        &:hover {path {fill: $color-red}}
        &:hover {transform: scale(.9)}
    }

    @media only screen and (max-width: 768px) {
        .search-layer {width: 100%;}
        .search {width: inherit;}
    }
</style>
