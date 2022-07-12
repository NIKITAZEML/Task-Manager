import Vue from 'vue'
import Vuex from 'vuex'

import network from './network'
import taskFile from './board/taskFile'
import projectFile from './board/projectFile'
import user from './user'
import board from './board/board'
import viewport from './viewport'
import tab from './board/tab'
import task from './board/task'
import project from './board/project'
import subtask from './board/subtask'
import comment from './board/comment'
import executor from './board/executor'
import directory from './directory'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        board,
        viewport,
        network,
        tab,
        task,
        taskFile,
        project,
        projectFile,
        subtask,
        comment,
        executor,
        directory
    }
})

export const {dispatch, commit, getters} = store
export default store
