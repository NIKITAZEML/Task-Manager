<template>
    <div class="checkbox-item">
        <div class="checkbox-inner" v-if="!isEdit || role !== Role.ADMIN">
            <el-checkbox :disabled="role !== Role.ADMIN" @change="update" class="checkbox-status" v-model="subtask.status"></el-checkbox>
            <div class="checkbox-wrapper">
                <p class="checkbox-text" @click="render">{{subtask.text}}</p>
                <ButtonRemove v-role="Role.ADMIN" @click.native="$emit('remove', subtask.id)"/>
            </div>
        </div>

        <div class="checkbox-inner" v-if="isEdit && role === Role.ADMIN">
            <div class="checkbox-edit">
                <textarea class="modal-form-textarea" v-model="subtask.text"></textarea>
                <SubtaskAddExecutor
                    @add="() => this.subtask.executors.unshift({id: uuid(), fullName: '', isLocal: true})"/>

                <Executors :executors="subtask.executors" @remove="({id, isLocal}) => isLocal ?
                            subtask.executors = subtask.executors.filter(e => e.id !== id) :
                            $store.dispatch('subtask/deleteExecutor', {subtaskId: subtask.id, executorId: id})"/>

                <div class="edit-wrapper">
                    <input v-model="subtask.date" class="modal-form-date" type="date"/>
                    <div class="edit-group">
                        <el-button @click="edit" type="primary" icon="el-icon-check" circle size="mini"></el-button>
                        <el-button @click="render" type="danger" icon="el-icon-close" circle size="mini"></el-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!isEdit || role !== Role.ADMIN">
            <div @click="render" class="checkbox-date">{{parseDate}}</div>
            <div class="checkbox-tags">
                <el-tag class="checkbox-tag" v-if="item.fullName" size="mini" v-for="(item, i) of subtask.executors" :key="i">{{item.fullName}}</el-tag>
            </div>
        </div>

    </div>
</template>

<script>
import SubtaskAddExecutor from "@/components/Modals/Elements/subtask/SubtaskAddExecutor"
import Executors from '@/components/Modals/Elements/Executors'
import ButtonAdd from "@/components/Buttons/ButtonAdd"
import ButtonRemove from '@/components/Buttons/ButtonRemove'
import moment from 'moment'
import {v4 as uuid} from "uuid";
moment.locale('ru')

export default {
    name: 'SubtaskItem',
    props: {
        subtask: Object,
    },
    data: () => ({
        uuid,
        isEdit: false,
    }),
    computed: {
        parseDate() {return moment(new Date(this.subtask.date).getTime()).format('DD.MM.YYYY')},
        role() {return this.$store.getters['user/getRole']},
    },
    methods: {
        update() {
            this.$emit('update', this.subtask)
        },
        edit() {
            this.render()
            this.update()
        },
        render() {this.isEdit = !this.isEdit},
    },
    components: {ButtonAdd, ButtonRemove, Executors, SubtaskAddExecutor}
}
</script>

<style lang="scss" scoped>
.checkbox-item {
    @include flex(space-between, flex-start, column);
    margin: .5rem 0;
}
.checkbox-status {
    margin: 0 .72916rem 0 0;
}
.checkbox-inner {
    width: 100%;
    @include flex(space-between);
    margin: 0 0 .52083rem 0;
}
.checkbox-wrapper {
    @include flex(space-between);
    flex-grow: 1;
}
.checkbox-date {
    @include font-size(14);
    color: $color-gray;
}
.checkbox-person {
    @include font-size(16);
    margin: 0 0 .25rem 0;
    span {
        display: inline-block;
        margin: 0 .25rem 0 0;
        &::after {content: ",";}
        &:last-of-type::after {content: "";}
    }
}
.checkbox-text {
    display: flex;
    flex-grow: 1;
    @include font-size(18, 160%);
    word-break: break-word;
    cursor: pointer;
}
.checkbox-edit {
    @include flex(initial, initial, column);
    flex: 1;
}
.checkbox-tags {margin: .5rem 0 0 0;}
.checkbox-tag {margin: 0 .5rem 0 0;}
.edit-wrapper {@include flex(space-between);}
</style>
