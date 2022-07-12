<template>
    <div v-if="logs.length" class="logs">
        <HistoryLogsItem :log="log" v-for="(log, i) of dynamicLogs" :key="i"/>
        <div v-if="logs.length > sliceAmount" class="logs__btn" @click="renderLogs">
            <span>{{btnText}}</span>
            <svg class="btn__icon" width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0.361328L0.589996 1.77133L5.17 6.36133L0.589996 10.9513L2 12.3613L8 6.36133L2 0.361328Z" fill="#007AFF"/>
            </svg>
        </div>
    </div>
</template>

<script>

import HistoryLogsItem from "@/components/Modals/Elements/HistoryLogsItem"

export default {
    props: ['id'],
    name: 'HistoryLogs',
    data: () => ({
        dynamicLogs: [],
        logs: [],
        sliceAmount: 3,
        btnText: 'Показать все действия'
    }),
    methods: {
        renderLogs() {
            if (this.dynamicLogs.length >= this.logs.length) {
                this.dynamicLogs = this.logs.slice(0, this.sliceAmount)
                this.btnText = 'Показать все действия'
            }
            else {
                this.dynamicLogs = this.logs
                this.btnText = 'Скрыть действия'
            }
        }
    },
    computed: {
        slicedLogs() {
            return this.logs.splice(0, 3)
        }
    },
    created() {
        const {dispatch} = this.$store

        dispatch('task/getHistory', this.id).then(logs => {
            this.logs = logs.reverse()
            console.log(logs)
            this.dynamicLogs = this.logs.slice(0, this.sliceAmount)
        })
    },
    components: {HistoryLogsItem}
}
</script>

<style lang="scss" scoped>
.logs__btn {
    color: $color-sky;
    font-weight: 500;
    @include font-size(18);
    cursor: pointer;
    user-select: none;
    margin: 0 0 3.125rem 1.35416rem;
}
.btn__icon {
    width: .3125rem;
    height: .625rem;
    margin: 0 0 0 .9375rem;
}
@media only screen and (max-width: 480px) {
    .logs__btn {
        width: max-content;
        display: block;
        margin: 0 auto 1.35416rem auto;
    }
}
</style>
