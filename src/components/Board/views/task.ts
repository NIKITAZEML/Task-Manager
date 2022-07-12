import {Component, Vue, Prop} from 'vue-property-decorator'
import {mapGetters} from 'vuex'
import moment from 'moment'
import {EventBus} from '@/main'
import {Task} from '@/interfaces/task'
import {EventSystem} from '@/config/event'

@Component({
    computed: {...mapGetters('viewport', {isTablet: 'isTablet'})}
})
export default class TaskMixin extends Vue {

    @Prop({type: Object, required: true})
    protected task: Task

    protected loading: boolean = false

    public get clipTitle(): string {
        const {title} = this.task
        const maxLength = 140
        return title.length > maxLength ? `${title.substr(0, maxLength)}...` : title
    }

    public get term() {
        if (!this.task.term) return false
        const timestamp = new Date(this.task.term)
        return moment(timestamp.getTime()).format('до DD MMM YYYY') || null
    }

    public get isDeadline(): boolean {
        return this.task.status === 'Просрочено'
    }

    created() {
        EventBus.$on(EventSystem.TASK_PRELOADER_RENDER, (task: Task) => (this.task.id === task.id ? this.loading = true : null))
        EventBus.$on(EventSystem.TASK_PRELOADER_DISABLE, (task: Task) => {
            if (this.task.id !== task.id) return
            this.loading = false
        })
    }

}
