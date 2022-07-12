import api from '@/helpers/http/api'
import BoardService from '@/services/BoardService'
import {BOARD_REPRESENTATION} from '@/config/app'
import {Project} from '@/interfaces/project'
import {Board} from '@/interfaces/board'
import {Task} from '@/interfaces/task'
import {sortByABC} from '@/helpers/utils'

const {TABLE, GRID} = BOARD_REPRESENTATION

export default {
    namespaced: true,
    state: () => ({
        boards: [] as Board[],
        board: {} as Board,
        users: [],
        isRevisionMode: false,
        versions: []
    }),
    actions: {
        async getAll(ctx) {
            try {
                const boards: Board[] = await BoardService.getAll()
                ctx.commit('setBoards', boards)
            } catch (e) {throw e}
        },
        async getAllWhereOwner(ctx) {
            try {
                const boards: Board[] = await BoardService.getAllWhereOwner()
                return <Board[]>boards
            } catch (e) {throw e}
        },
        async getById(ctx, id) {
            const representation: string = ctx.rootGetters['tab/getRepresentationActive']
            const filter: string = ctx.rootGetters['tab/getTaskActive']
            try {
                const board: Board = await BoardService.getById(id, filter, representation)
                console.log(board, representation)

                if (representation === GRID) {
                    const projects: Project[] = sortByABC(<Project[]>board.projects, 'title')
                    if (board.tasks.length) projects.unshift(<Project>{title: '', tasks: board.tasks})
                    ctx.commit('project/setProjects', projects ?? [], {root: true})
                }
                if (representation === TABLE) {
                    const {tasks} = board
                    ctx.commit('task/setTasks', tasks ?? [], {root: true})
                }

                ctx.rootState.task.task.users = board.users
                ctx.rootState.task.task.projects = board.projects
                ctx.rootState.user.role = board.role
                ctx.commit('setBoard', board)
                return board
            }
            catch (e) {throw e.response.data}
        },
        async create(ctx, params) {
            try {
                const board: Board = await BoardService.create(params)
                ctx.commit('setBoards', [...ctx.state.boards, board])
            } catch (e) {console.log(e)}
        },
        async update(ctx, {id, params}) {
            try {
                const board: Board = await BoardService.update(id, params)
                ctx.commit('setBoard', board)
            } catch (e) {console.log(e)}
        },
        async getUsers(ctx, id) {
            try {
                const res = await api.get(`/board/${id}/roles/`)
                const entities = await res.data
                ctx.commit('setUsers', await entities.users)
            } catch (e) {console.log(e)}
        },
        async addUser(ctx, {boardId, email}) {
            try {
                const res = await api.post(`/board/${boardId}/roles/`, {email})
                return res
            } catch (e) {throw e.response}
        },
        async deleteUser(ctx, {boardId, userId}) {
            try {
                await api.delete(`/board/${boardId}/roles/`, {data: {id: userId}})
            } catch (e) {console.log(e)}
        },
        async editPermissionUser(ctx, {boardId, params}) {
            await api.put(`/board/${boardId}/roles/`, params)
        },
        // async enlargeTaskVersion(ctx, id) {
        //     try {
        //         const res = await api.post(`/task/${id}/increase/`)
        //         return convertServerResponse(res)
        //     } catch (e) {return convertServerResponse(e.response)}
        // },
        // async reduceTaskVersion(ctx, id) {
        //     try {
        //         const res = await api.post(`/task/${id}/decrease/`)
        //         return await res.data
        //     } catch (e) {console.log(e)}
        // },
        // async saveBoardVersions(ctx, id) {
        //     try {
        //         const res = await api.get(`/board/${id}/versions/`)
        //         ctx.commit('setVersions', res.data.versions)
        //     } catch (e) {console.log(e)}
        // },
        async triggerRevision(ctx, id) {
            try {
                const res = await api.get(`/board/${id}/revision/`)
                return res.data
            } catch (e) {console.log(e)}
        },
        async getCalendar(ctx, id) {
            try {
                return await api.get(`/board/${id}/ics/`)
            } catch (e) {console.log(e)}
        },
        async getInvitations(ctx, id: number) {
            try {
                const res = await api.get(`/board/${id}/turn/`)
                const users = res.data.users || []
                return users
            }
            catch (e) {throw e}
        },
        async confirmInvitation(ctx, {boardId, userId}) {
            try {
                await api.post(`/board/${boardId}/turn/`, {id: userId})
            } catch (e) {throw e}
        }
    },
    mutations: {
        setBoard: (state, payload) => state.board = payload,
        setBoards: (state, payload) => state.boards = payload,
        setUsers: (state, payload) => state.users = payload,
        // setRevisionMode: (state, payload) => state.isRevisionMode = payload,
        setVersions: (state, payload) => state.versions = payload
    },
    getters: {
        getBoard: state => state.board,
        getBoards: state => state.boards,
        getUsers: state => state.users,
        getRevisionMode: state => state.isRevisionMode,
        getVersions: state => state.versions
    }
}
