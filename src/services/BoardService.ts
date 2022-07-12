import {BOARD_FILTER, BOARD_REPRESENTATION} from '@/config/app'
import api from '@/helpers/http/api'
import {Board} from '@/interfaces/board'

const {GRID, TABLE} = BOARD_REPRESENTATION
const {ALL, ACTIVE, CANCELED, COMPLETED, COMPLETED_AND_CONFIRM, EXPIRED, HELP, WORK} = BOARD_FILTER

class BoardService {

    async getById(id: number, filter: string, representation: string): Promise<Board> {
        const request: string = this.getRouteFilter({id, filter, representation})
        const res = await api.get(request)
        return <Board>res.data
    }

    async getAll(): Promise<Board[]> {
        const res = await api.get('/boards/')
        return <Board[]>res.data
    }

    async create(payload: Board): Promise<Board> {
        const res = await api.post('/boards/', payload)
        return <Board>res.data
    }

    async update(id: number, payload: Board): Promise<Board> {
        const res = await api.put(`/board/${id}/`, payload)
        return <Board>res.data
    }

    async getAllWhereOwner(): Promise<Board[]> {
        const res = await api.get('/my-boards/')
        return <Board[]>res.data
    }

    protected getRouteFilter({id, filter, representation}): string | null {
        if (representation === GRID) return this.getRouteFilterByGrid(id, filter)
        if (representation === TABLE) return this.getRouteFilterByTable(id, filter)
        return null
    }

    protected getRouteFilterByGrid(id: number, filter: string): string {
        if (filter === ALL) return `/board/${id}/`
        if (filter === ACTIVE) return `/board/${id}/active-tasks/`
        if (filter === WORK) return `/board/${id}/in-work/`
        if (filter === HELP) return `/board/${id}/need-help/`
        if (filter === CANCELED) return `/board/${id}/canceled/`
        if (filter === COMPLETED) return `/board/${id}/completed/`
        if (filter === COMPLETED_AND_CONFIRM) return `/board/${id}/confirmed/`
        if (filter === EXPIRED) return `/board/${id}/expired/`
        return `/board/${id}/`
    }

    protected getRouteFilterByTable(id: number, filter: string): string {
        if (filter === ALL) return `/board/${id}/table/`
        if (filter === ACTIVE) return `/board/${id}/table/active-tasks/`
        if (filter === WORK) return `/board/${id}/table/in-work/`
        if (filter === HELP) return `/board/${id}/table/need-help/`
        if (filter === CANCELED) return `/board/${id}/table/canceled/`
        if (filter === COMPLETED) return `/board/${id}/table/completed/`
        if (filter === COMPLETED_AND_CONFIRM) return `/board/${id}/table/confirmed/`
        if (filter === EXPIRED) return `/board/${id}/table/expired/`
        return `/board/${id}/table/`
    }

}

export default new BoardService()
