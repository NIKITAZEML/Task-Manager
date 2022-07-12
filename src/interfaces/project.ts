import {Task} from '@/interfaces/task'
import {FileUpload} from '@/interfaces/file'

export interface ProjectFile extends FileUpload {
    project: number
}

export interface Project {
    readonly id: number
    title: string
    date?: string
    tasks?: Task[]
    files?: ProjectFile[] | File[]
}
