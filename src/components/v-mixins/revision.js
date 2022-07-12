import {mapGetters} from 'vuex'
import {EventBus} from "@/main"

export default {
    computed: mapGetters({
        isRevisionMode: ['board/getRevisionMode'],
        query: ['tab/getTaskActive'],
    }),
    methods: {
        enlargeTaskVersion(taskId) {
            const {dispatch} = this.$store
            dispatch('board/enlargeTaskVersion', taskId)
                .then(() => dispatch('board/getById', this.id))
        },
        reduceTaskVersion(taskId) {
            const {dispatch} = this.$store
            dispatch('board/reduceTaskVersion', taskId)
                .then(() => dispatch('board/getById', this.id))
        },
        revision() {
            if (this.isRevisionMode) {
                if (this.task.version === this.versions[0]) {
                    EventBus.$emit('removeLastVersionTask', this.taskId)
                    this.enlargeTaskVersion(this.taskId)
                }
                if (this.task.version === this.versions[1]) {
                    EventBus.$emit('removeNewVersionTask', this.taskId)
                    this.reduceTaskVersion(this.taskId)
                }
            }
            this.switchRender()
        }
    }
}
