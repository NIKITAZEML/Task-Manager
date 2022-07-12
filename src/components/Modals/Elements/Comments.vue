<template>
    <div class="form__comment">
        <label class="modal-form-label" for="comment">Комментарии</label>
        <textarea @input="validate" id="comment" v-model="comment" class="comment__field modal-form-textarea" placeholder="Ваш комментарий к задаче"></textarea>
        <div @click="add" ref="btnComment" disabled class="comment__btn modal-btn-sky">Отправить</div>

        <div class="comment__items">
            <CommentItem @update="update" @remove="remove" v-for="(comment, i) of sortComments" :key="i" :comment="comment"/>
        </div>
    </div>
</template>

<script lang="ts">
import Component from "vue-class-component"
import {Model} from 'vue-property-decorator'
import Vue from 'vue'
import {mapGetters} from "vuex"
import {dispatch} from '@/store'
import {Comment} from "@/interfaces/task"

const CommentItem = () => import('@/components/Modals/Elements/CommentItem.vue')

@Component({
    computed: {
        ...mapGetters('comment', {comments: 'getComments'})
    },
    components: {CommentItem}
})
export default class Comments extends Vue {

    private comments: Comment[]
    private taskId: number = +this.$route.query.taskId

    @Model()
    private comment: string = ''

    public add(): void {
        if (this.comment) {
            const comment: Comment = {text: this.comment}
            dispatch('comment/create', {taskId: this.taskId, comment})
                .then(() => this.comment = '')
            this.validate()
        }
    }

    public update(comment: Comment): void {
        dispatch('comment/update', {taskId: this.taskId, comment})
    }

    public remove(id: number): void {
        console.log(id)
        dispatch('comment/delete', {taskId: this.taskId, commentId: id})
    }

    public get sortComments(): Comment[] {
        return this.comments.reverse()
    }

    private validate() {
        const btn: HTMLButtonElement = (this.$refs['btnComment'] as HTMLButtonElement)
        if (this.comment) btn.removeAttribute('disabled')
        else btn.setAttribute('disabled', 'true')
    }

}
</script>

<style lang="scss" scoped>
.form__comment {
    margin: 0 0 1rem 0;
}
.comment__wrapper {
    @include flex()
}
.comment__field {
    width: 100%;
    margin: 0 0 .416rem 0 !important;
}
.comment__btn {
    display: flex;
    margin: 0 0 1rem auto;
}
</style>
