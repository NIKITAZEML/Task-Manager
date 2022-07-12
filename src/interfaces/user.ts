export enum Role {
    ADMIN = 'admin',
    EXECUTOR = 'executor',
    CONTROL = 'control',
    VIEWER = 'viewer',
}

export interface Entity {
    readonly id: number
    email?: string
    password?: string
    role: Role
    token?: string
    variety?: string
}

export interface Organization extends Entity {
    title?: string
}

export interface User extends Entity {
    fullName?: string
}
