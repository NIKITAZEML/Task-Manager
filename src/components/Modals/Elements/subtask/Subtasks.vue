<template>
    <div class="subtasks">

        <div class="subtasks__add" v-role="Role.ADMIN">
            <span>Добавить задачу</span>
            <ButtonAdd @click.native="render"/>
        </div>

        <div v-if="isEdit" class="subtasks__edit">
            <textarea @dblclick="render" v-model="subtask.text" class="modal-form-textarea"></textarea>
            <SubtaskAddExecutor
                @add="() => subtask.executors.unshift({id: uuid(), fullName: '', isLocal: true})"/>

            <Executors :executors="subtask.executors"
                       @remove="({id}) => subtask.executors = subtask.executors.filter(e => e.id !== id)"/>

            <div class="edit__wrapper">
                <input v-model="subtask.date" class="modal-form-date" type="date"/>
                <div class="edit__group">
                    <el-button @click="createSubtask" type="primary" icon="el-icon-check" circle size="mini"></el-button>
                    <el-button @click="render" type="danger" icon="el-icon-close" circle size="mini"></el-button>
                </div>
            </div>
        </div>

        <div v-if="subtasks.length" class="subtasks__items">
            <SubtaskItem v-for="(subtask, i) of subtasks" :key="i"
                         :subtask="subtask"
                         @update="subtask => $emit('update', subtask)"
                         @remove="id => $emit('remove', id)"/>
        </div>
    </div>
</template>

<script>
import SubtaskItem from "@/components/Modals/Elements/subtask/SubtaskItem"
import SubtaskAddExecutor from "@/components/Modals/Elements/subtask/SubtaskAddExecutor"
import ExecutorCreate from '@/components/Modals/Elements/ExecutorCreate'
import Executors from '@/components/Modals/Elements/Executors'
import ButtonAdd from "@/components/Buttons/ButtonAdd"
import {v4 as uuid} from 'uuid'

export default {
    name: 'Subtasks',
    data: () => ({
        uuid,
        subtask: {
            text: '',
            date: '',
            executors: []
        },
        responsible: {id: uuid(), fullName: ''},
        isEdit: false
    }),
    computed: {
        subtasks() {return this.$store.getters['subtask/getSubtasks']},
    },
    methods: {
        createSubtask() {
            const {text, date, executors} = this.subtask

            if (text && date) {
                console.log(this.subtask.executors)
                this.$emit('add', {text, date, executors})
                this.subtask.text = this.subtask.date = ''
                this.subtask.executors = []
            }
            this.render()
        },
        render() {this.isEdit = !this.isEdit}
    },
    components: {SubtaskItem, ExecutorCreate, ButtonAdd, Executors, SubtaskAddExecutor}
}
</script>

<style scoped lang="scss">
.subtasks {margin: 0 0 1rem 0;}
.subtasks__items {@include flex(initial, initial, column);}
.subtasks__group {@include flex(initial, center);}
.subtasks__add {
    @include flex(space-between, center);
    span {@include font-size(18);}
    margin: 0 0 .5rem 0;
}
.subtasks__icon {
    width: .72916rem;
    height: .72916rem;
    margin: 0 .416rem 0 0;
}
.subtasks__clear {margin: 0 0 0 2.60416rem;}
.subtasks__empty {margin: 1rem 0;}
.subtasks__edit {@include flex(initial, initial, column);}
.edit__wrapper {
    @include flex(space-between);
    input[type="date"] {margin: 0;}
}
.edit__group {@include flex(initial, center);}
</style>

