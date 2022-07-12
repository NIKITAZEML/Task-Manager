import {v4 as uuid} from 'uuid'

export enum FilterType {TEXT, DATE}
export enum FilterSort {ASCENDING, DESCENDING}

export interface FilterTask {
    id: string
    title: string
    sort: FilterSort | null
    type: FilterType
    slug: string
    class: string
}

export const filters = [
    {
        id: uuid(),
        title: 'Протокол',
        sort: null,
        type: FilterType.TEXT,
        slug: 'title',
        class: 'el-col-12'
    },
    {
        id: uuid(),
        title: 'Проект',
        sort: null,
        type: FilterType.TEXT,
        slug: 'project',
        class: 'el-col-4'
    },
    {
        id: uuid(),
        title: 'Ответственный',
        sort: null,
        type: FilterType.TEXT,
        slug: 'responsible',
        class: 'el-col-3 el-col-offset-1'
    },
    {
        id: uuid(),
        title: 'Срок',
        sort: null,
        type: FilterType.DATE,
        slug: 'term',
        class: 'el-col-2'
    },
    {
        id: uuid(),
        title: 'Статус',
        sort: null,
        type: FilterType.TEXT,
        slug: 'status',
        class: 'el-col-2'
    }

]
