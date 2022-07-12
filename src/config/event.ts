export const EventSystem = {
    SWITCH_MODAL_CREATION_TASK: 'switchModalCreationTask',
    SWITCH_MODAL_EDITION_TASK: 'switchModalEditionTask',
    SWITCH_MODAL_CREATION_PROJECT: 'switchModalCreationProject',
    SWITCH_MODAL_EDITION_PROJECT: 'switchModalEditionProject',
    SWITCH_MODAL_MOVE_TASK: 'switchModalMoveTask',
    SWITCH_MODAL_CREATION_BOARD: 'switchModalCreationBoard',
    SWITCH_MODAL_EDITION_BOARD: 'switchModalEditionBoard',
    SWITCH_MODAL_INVITE_USER: 'switchModalInviteUser',
    SWITCH_MODAL_MANAGE_INVITATION: 'switchModalManageInvitation',
    SWITCH_MODAL_DIRECTORY: 'switchModalDirectory',
    BOARD_CLEAR_SEARCH: 'boardClearSearch',
    BOARD_REARRANGE: 'boardReArrange',
    TASK_PRELOADER_RENDER: 'taskPreloaderRender',
    TASK_PRELOADER_DISABLE: 'taskPreloaderDisable'
}

export enum ModalAction {
    UPDATE = 'update',
    CREATE = 'create'
}

export enum TaskModalPayloadContext {
    DEFAULT = 0,
    PROJECT = 1
}

export interface ModalPayload {
    id?: number
    action: ModalAction
}

export interface TaskModalPayload extends ModalPayload {
    ctx?: TaskModalPayloadContext,
    project?: string
}

export interface BoardModalPayload {
    id?: number
    action: ModalAction
}
