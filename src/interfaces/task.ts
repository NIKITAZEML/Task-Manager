import {FileUpload} from '@/interfaces/file'

export type TaskStatus = 'В работе' | 'Требуется помощь' | 'Отменено' | 'Завершено' | 'Завершено и подтверждено' | 'Просрочено'

export interface Comment {
    readonly id?: number
    text?: string
    date?: string
}

export interface TaskFile extends FileUpload {
    task: number
}

export interface TaskExecutor {
    id: number | string
    fullName: string
}

export interface Task {
    readonly id: number
    title: string
    status: TaskStatus
    term: string
    date: string
    files?: TaskFile[] | File[]
    comments?: Comment[]
    subtasks?: Array<any>
    icon: string | null
    responsible?: TaskExecutor
    executors?: Array<any>
    project?: string
    projectId?: number
}

export interface TaskHistory {
    readonly id: number
    action?: string
    changed?: string
    user?: string
}

export interface TaskIcon {
    readonly id: number
    description?: string
    image?: string
}
