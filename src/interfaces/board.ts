import {Task} from '@/interfaces/task'
import {Project} from '@/interfaces/project'
import {Role} from '@/interfaces/user'

export interface Board {
    readonly id: number
    title: string
    status: string
    owner: number
    tasks?: Task[]
    projects?: Project[]
    users?: Array<any>
    role: Role
}
