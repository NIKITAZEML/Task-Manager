import {BOARD_FILTER, BOARD_REPRESENTATION, CACHE} from '@/config/app'
import Storage from '@/helpers/storage/Storage'

const {TAB} = CACHE

export default {
    namespaced: true,
    state: () => ({
        taskActive: Storage.isKey(TAB.TASK) ? Storage.get(TAB.TASK) : BOARD_FILTER.ACTIVE,
        representationActive: Storage.isKey(TAB.REPRESENTATION) ? Storage.getJson(TAB.REPRESENTATION) : BOARD_REPRESENTATION.GRID,
        taskTab: [
            {
                title: 'Только активные задачи',
                value: BOARD_FILTER.ACTIVE,
                active: true
            },
            {
                title: 'Все задачи',
                value: BOARD_FILTER.ALL,
                active: false
            },
            {
                title: 'В работе',
                value: BOARD_FILTER.WORK,
                active: false
            },
            {
                title: 'Требуется помощь',
                value: BOARD_FILTER.HELP,
                active: false
            },
            {
                title: 'Отменено',
                value: BOARD_FILTER.CANCELED,
                active: false
            },
            {
                title: 'Завершено',
                value: BOARD_FILTER.COMPLETED,
                active: false
            },
            {
                title: 'Завершено и подтверждено',
                value: BOARD_FILTER.COMPLETED_AND_CONFIRM,
                active: false
            },
            {
                title: 'Просрочено',
                value: BOARD_FILTER.EXPIRED,
                active: false
            }
        ],
        representationTab: [
            {
                title: 'Kanban',
                value: BOARD_REPRESENTATION.GRID,
                active: true
            },
            {
                title: 'Табличный',
                value: BOARD_REPRESENTATION.TABLE,
                active: false
            }
        ]
    }),
    mutations: {
        setTaskActive: (state, payload) => state.taskActive = payload,
        setRepresentationActive: (state, payload) => state.representationActive = payload
    },
    getters: {
        getTaskTab: state => state.taskTab,
        getRepresentationTab: state => state.representationTab,
        getTaskActive: state => state.taskActive,
        getRepresentationActive: state => state.representationActive
    }
}
