import TaskService from '@/services/TaskService'
import {Task, TaskHistory, TaskIcon, TaskStatus} from '@/interfaces/task'
import {BOARD_REPRESENTATION} from '@/config/app'
import api from '@/helpers/http/api'

const {TABLE, GRID} = BOARD_REPRESENTATION

export default {
    namespaced: true,
    state: () => ({
        task: {
            title: '',
            status: 'В работе',
            project: '',
            executors: []
        } as Task,
        tasks: [] as Task[],
        icons: [] as TaskIcon[]
    }),
    actions: {
        async getById(ctx, id) {
            try {
                const task: Task = await TaskService.getById(id)
                ctx.commit('subtask/setSubtasks', task.subtasks, {root: true})
                ctx.commit('comment/setComments', task.comments, {root: true})
                ctx.commit('executor/setExecutors', task.executors, {root: true})
                ctx.commit('taskFile/setFiles', task.files, {root: true})
                ctx.commit('setTask', task)
            }
            catch (e) {console.log(e)}
        },
        async getAll(ctx) {
            try {
                const tasks: Task[] = await TaskService.getAll()
                ctx.commit('setTasks', tasks)
            } catch (e) {console.log(e)}
        },
        async create(ctx, {id, params}) {
            try {
                const task: Task = await TaskService.create(id, params)
                ctx.commit('setTask', task)
            } catch (e) {console.log(e)}
        },
        async update(ctx, {id, params}) {
            try {
                const task: Task = await TaskService.update(id, params)
                ctx.dispatch('updateLocal', task)
                ctx.commit('setTask', task)
            } catch (e) {console.log(e)}
        },
        async delete(ctx, id) {
            try {
                const res = await TaskService.delete(id)
                ctx.dispatch('deleteLocal', id)
            }
            catch (e) {console.log(e)}
        },
        async getAllWhereResponsible(ctx, boardId: number): Promise<Task[]> {
            try {
                const tasks: Task[] = await TaskService.getAllWhereResponsible(boardId)
                return <Task[]>tasks
            } catch (e) {throw e}
        },
        async move(ctx, {boardId, params}) {
            try {
                const res = await TaskService.move(boardId, params)
            }
            catch (e) {throw e}
        },
        async getHistory(ctx, id) {
            try {
                return await TaskService.getHistory(id) as TaskHistory[]
            } catch (e) {throw e}
        },
        async getIcons(ctx) {
            try {
                const icons: TaskIcon[] = await TaskService.getIcons()
                ctx.commit('setIcons', icons)
            } catch (e) {throw e}
        },
        async createLocal(ctx, newTask: Task) {
            const {id} = newTask
            const representation: string = ctx.rootGetters['tab/getRepresentationActive']

            if (representation === TABLE) ctx.commit('add', newTask)

            if (representation === GRID) {
                // const projects: Project[] = [...ctx.rootGetters['project/getProjects']]
                //
                // const i = projects.findIndex(project => project.title === newTask.project)
                // const project: Project = projects.find(project => newTask.project === project.title)
                //
                // if (project) {
                //     project.tasks.push(newTask)
                // }
                // else {
                //     projects.push()
                // }
                //
                //
                // projects[i].tasks = tasks
                // ctx.commit('project/setProjects', projects, {root: true})
            }
        },
        async updateLocal(ctx, newTask) {
            const {id} = newTask
            const representation: string = ctx.rootGetters['tab/getRepresentationActive']

            if (representation === TABLE) ctx.state.tasks = [...ctx.state.tasks].map((task, i) => {
                if (task.id === id) task = newTask
                return task
            })

            if (representation === GRID) {
                const projects = [...ctx.rootGetters['project/getProjects']]
                for (const project of projects) {
                    const task = project.tasks.find(task => task.id === id) || {}
                    if (project.tasks.length) for (const item of project.tasks)
                        if (task.id === item.id) {
                            const indexTask = project.tasks.indexOf(task)
                            const indexProject = projects.indexOf(project)
                            projects[indexProject].tasks[indexTask] = newTask
                            ctx.commit('project/setProjects', projects, {root: true})
                            break
                        }
                }
            }
        },
        async deleteLocal(ctx, id) {
            const representation: string = ctx.rootGetters['tab/getRepresentationActive']

            if (representation === TABLE) ctx.commit('delete', id)

            if (representation === GRID) for (const project of ctx.rootGetters['project/getProjects'])
                project.tasks = project.tasks.filter(task => task.id !== id)
        }
    },
    mutations: {
        add: (state, payload) => state.tasks.push(payload),
        delete: (state, id) => state.tasks = state.tasks.filter(task => task.id !== id),
        setTask: (state, payload) => state.task = payload,
        setTasks: (state, payload) => state.tasks = payload,
        setIcons: (state, payload) => state.icons = payload
    },
    getters: {
        getTask: state => state.task,
        getTasks: state => state.tasks,
        getIcons: state => state.icons,
        getStatus: () => {
            const status: TaskStatus[] = ['В работе', 'Требуется помощь', 'Отменено', 'Завершено', 'Завершено и подтверждено', 'Просрочено']
            return status
        }
    }
}
