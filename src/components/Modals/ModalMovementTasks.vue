<template>
    <Modal width="90rem" title="Перемещение задач">
        <div class="panel">
            <div class="column">
                <div class="panel__title">Текущая доска</div>
                <div class="panel__items" v-if="board.title">
                    <el-badge type="primary" size="small" :value="tasks.length || null">
                        <div class="project">
                            <i class="el-icon-s-order"/>
                            {{board.title}}
                        </div>
                    </el-badge>
                </div>
            </div>
            <div class="column">
                <div class="panel__title">Задачи</div>
                <div class="panel__items" v-if="tasks.length">
                    <Isotope style="width: 100%" :options="{}" :list="tasks" item-selector="task">
                        <div class="task" v-for="(task, i) of tasks" :key="i">
                            <div class="task__title">{{task.title}}</div>
                            <div class="task__user"><i class="el-icon-user-solid"/>{{task.responsible.fullName}}</div>
                            <el-tag v-if="task.project" class="task__tag" type="primary" size="mini">{{task.project}}</el-tag>

                            <el-dropdown trigger="click" placement="right-start">
                                <el-button type="primary" size="mini" round>Переместить</el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if="board.id !== id" @click.native="moveTaskToAnotherBoard(board.id, task.id)" v-for="board of boards" :key="board.id" icon="el-icon-share">{{board.title}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </Isotope>
                </div>
                <div v-else>Вы не закреплены ни за одной задачей как исполнитель</div>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import Component, {mixins} from "vue-class-component"
import {ModalWindow} from "@/components/Modals/modal.ts"
const Modal = () => import('@/components/Modals/Modal.vue')

import {dispatch, getters} from '@/store'
import {EventBus} from "@/main"
import {EventSystem} from "@/config/event.ts"
import {Task} from '@/interfaces/task'
import {Board} from "@/interfaces/board"
import Isotope from 'vueisotope'

@Component({
    components: {Modal, Isotope}
})
export default class ModalManageInvitation extends mixins(ModalWindow) {

    private boards: Board[] = []
    private tasks: Task[] = []

    private get id(): number {return +this.$route.params.id}
    private get board(): Board {return getters['board/getBoard']}

    public moveTaskToAnotherBoard(boardId: number, taskId: number) {
        const {success, error} = this.$message
        const board = this.boards.find(b => b.id === boardId)
        const params = {board: boardId, task: taskId}
        dispatch('task/move', {boardId: this.id, params})
            .then(() => {
                this.tasks = this.tasks.filter(t => t.id !== taskId)
                dispatch('task/deleteLocal', taskId)
                success(`Задача была перемещена на доску ${board.title}`)
            })
            .catch(() => error({message: `Не удалось переместить задачу на доску ${board.title}`}))
    }

    created() {
        EventBus.$on(EventSystem.SWITCH_MODAL_MOVE_TASK, () => {
            dispatch('task/getAllWhereResponsible', this.id)
                .then((tasks: Task[]) => this.tasks = tasks)
            dispatch('board/getAllWhereOwner')
                .then((boards: Board[]) => this.boards = boards)
            this.open()
        })
    }

}
</script>

<style lang="scss" scoped>
.panel {
    display: flex;
    justify-content: space-between;
    min-height: 500px;
}
.panel > .column:first-child {width: 25%;}
.panel > .column:last-child {width: 70%;}
.panel__title {
    @include font-size(20);
    font-weight: 600;
    margin: 0 0 1rem 0;
}
.panel__items {
    display: block;
}

.project {
    width: 100%;
    display: block;
    @include font-size(24);
    transition: $transition-default;
    cursor: pointer;
    &:hover {
        background-color: $color-light-gray;
    }
    border-radius: 1rem;
    padding: .5rem;
    margin: 0 0 .5rem 0;
}
.task {
    width: 30%;
    border: 1px solid gainsboro;
    border-radius: .5rem;
    padding: 1rem;
    margin: 0 2% 1rem 0;
}
.task__title {
    word-wrap: break-word;
    @include font-size(20);
    margin: 0 0 .5rem 0;
}
.task__user {
    @include font-size(20);
    margin: 0 0 .5rem 0;
    color: $color-gray;
}
.task__tag {
    width: max-content;
    display: block;
    margin: 0 0 .5rem 0;
}
.el-dropdown-menu {
    max-height: 200px;
    overflow: auto;
}
.el-badge {
    width: max-content;
    display: block;
}

@media only screen and (max-width: 768px) {
    .panel {
        flex-direction: column;
    }
    .task {
        width: 48px;
    }
}
</style>
