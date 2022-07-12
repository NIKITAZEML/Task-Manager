<template>
    <div class="comment__item">
        <div class="comment__wrapper">
            <div class="comment__head">
                <div v-if="comment.user" class="comment__author">{{comment.user}}</div>
                <div v-if="comment.date" class="comment__date">{{date}}</div>
            </div>
            <div class="comment__btns">
                <el-button @click="render" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
                <el-button @click="$emit('remove', comment.id)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </div>
        </div>
        <div v-if="!isEdit" v-loading="comment.loading" @dblclick="render" class="comment__text">{{comment.text}}</div>
        <div v-if="isEdit">
            <textarea @dblclick="render" v-if="isEdit" v-model="comment.text" class="comment__field modal-form-textarea" placeholder="Ваш комментарий к задаче"></textarea>
            <el-button @click="edit" type="primary" icon="el-icon-check" circle size="mini"></el-button>
            <el-button @click="render" type="danger" icon="el-icon-close" circle size="mini"></el-button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
export default {
    name: 'CommentItem',
    props: {comment: Object},
    data: () => ({
        isEdit: false,
    }),
    methods: {
        edit() {
            const {id} = this.comment
            this.$emit('update', {id, text: this.comment.text})
            this.isEdit = !this.isEdit
        },
        render() {this.isEdit = !this.isEdit},
    },
    computed: {
        date() {
            const date = new Date(this.comment.date).getTime()
            return moment(date).format('DD.MM.YYYY, HH:mm')
        }
    }
}
</script>



<style lang="scss" scoped>
    .comment__item {
        display: flex;
        flex-direction: column;
        margin: .5rem 0;

    }
    .comment__head {
        @include flex(initial, center);
        color: $color-gray;
    }
    .comment__author {
        @include font-size(18);
        margin: 0 .4rem 0 0;
    }
    .comment__date {
        @include font-size(16);
    }
    .comment__wrapper {
        @include flex(space-between);
        margin: 0 0 .5rem 0;
    }
    .comment__text {
        @include font-size(16, 150%);
        padding: 0 0 .5rem 0;
    }
    .comment__remove {
        cursor: pointer;
        transition: $transition-default;
        &:hover {
            transform: scale(1.2);
            color: $color-red;
        }
    }
    .comment__edit {
        cursor: pointer;
        transition: $transition-default;
        &:hover {
            transform: scale(1.2);
            color: $color-sky;
        }
    }
    .comment__field {
        width: 100%;
        margin: 0 0 .416rem 0 !important;
    }
    @media only screen and (max-width: 480px) {
        .comment__head {
            @include flex(initial, flex-start, column);
            color: $color-gray;
            line-height: 150%;
        }
    }
</style>
