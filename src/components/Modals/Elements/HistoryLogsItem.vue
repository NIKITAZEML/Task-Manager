<template>
    <div class="logs__item">
        <div class="logs__wrapper">
            <div class="logs__author">{{log.user}}</div>
            <div class="logs__action">{{msg}}</div>
        </div>
        <div class="logs__date">{{this.date}}</div>
    </div>
</template>

<script>

import moment from "moment"
moment.locale('ru')

const Action = {
    CREATE: 'create',
    UPDATE: 'update'
}
const Field = {
    TITLE: 'title',
    VERSION: 'version',
    EXECUTOR: 'responsible',
    EXECUTORS: 'executors',
    DATE: 'term',
    ACTION: 'icon'
}

export default {
    props: {
        log: Object
    },
    name: 'HistoryLogsItem',
    computed: {
        date() {return moment(this.log.changed).format('DD MMMM YYYY в HH:mm')},
        msg() {
            const {data, action} = this.log
            let fields = []
            let messages = []
            let msg = ''

            typeof data === 'object' ? fields = Object.keys(data) : null

            fields.includes(Field.TITLE) ?  messages.push('задачу') : null
            fields.includes(Field.VERSION) ? messages.push('версию карточки') : null
            fields.includes(Field.DATE) ? messages.push('срок выполнения') : null
            fields.includes(Field.EXECUTOR) ? messages.push('ответственного') : null
            fields.includes(Field.EXECUTORS) ? messages.push('соисполнителей') : null
            fields.includes(Field.ACTION) ? messages.push('иконку действия') : null

            if (action === Action.UPDATE)
                messages.length ?
                    msg = `обновил(а) — ${messages.toString().replace(',', ', ')}` :
                    msg = 'обновил(а) карточку'

            if (action === Action.CREATE)
                msg = `создал(а) запись`

            return msg
        }
    },
}
</script>

<style lang="scss" scoped>

.logs__item {
    margin: 0 0 1.5625rem 0;
}

.logs__wrapper {
    display: flex;
    margin: 0 0 .6rem 0;
}
.logs__author {
    font-weight: bold;
    color: #939394;
    @include font-size(18);
    margin: 0 .4166rem 0 0;
}
.logs__action {
    @include font-size(18);
}
.logs__date {
    color: #939394;
    @include font-size(14);
}

@media only screen and (max-width: 480px) {
    .logs__wrapper {
        flex-direction: column;
        margin: 0;
    }
    .logs__author,
    .logs__action {margin: 0 0 .3rem 0;}
}
</style>
