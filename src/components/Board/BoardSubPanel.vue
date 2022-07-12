<template>
    <div class="board__submenu container">
        <el-button @click.native="EventBus.$emit(EventSystem.SWITCH_MODAL_INVITE_USER)" round size="mini" type="success">Пригласить</el-button>
        <el-button v-if="role === Role.ADMIN" @click.native="EventBus.$emit(EventSystem.SWITCH_MODAL_MANAGE_INVITATION)" round size="mini" type="success">Модерация приглашений</el-button>
        <el-button v-loading="loadingCalendar" @click.native="receiveCalendarToEmail" icon="el-icon-date" round type="warning" size="mini">Календарь</el-button>
        <el-button @click="getReport" v-if="!isTablet && !isMobile && representation === BOARD_REPRESENTATION.GRID" icon="el-icon-edit-outline" type="success" size="mini" round>Отчет</el-button>
        <el-button v-if="representation === BOARD_REPRESENTATION.GRID && role === Role.ADMIN" @click="EventBus.$emit(EventSystem.SWITCH_MODAL_CREATION_PROJECT, {action: ModalAction.CREATE})" icon="el-icon-collection" type="primary" size="mini" round>Создать проект</el-button>
        <el-button @click="EventBus.$emit(EventSystem.SWITCH_MODAL_DIRECTORY)" type="primary" size="mini" round>Справочник</el-button>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {BOARD_REPRESENTATION} from "@/config/app.ts";

export default {
    name: 'BoardSubPanel',
    data: () => ({
        loadingCalendar: false,
        BOARD_REPRESENTATION,
    }),
    methods: {
        receiveCalendarToEmail() {
            this.loadingCalendar = true
            this.$store.dispatch('board/getCalendar', this.$route.params.id)
                .then(({status}) => {
                    if (status === 204)
                        this.$alert('Задач не найдено')
                    if (status === 200)
                        this.$alert('Файл календаря отправлен на почту')
                })
                .finally(() => this.loadingCalendar = false)
        },
        getReport() {
            location.href = `https://back-missions.admlr.lipetsk.ru/board/${this.$route.params.id}/report/`
        }
    },
    computed: mapGetters({
        isMobile: ['viewport/isMobile'],
        isTablet: ['viewport/isTablet'],
        representation: ['tab/getRepresentationActive'],
        role: ['user/getRole']
    }),
}
</script>

<style lang="scss" scoped>
.board__submenu {padding: 1rem 0;}
.el-button--mini {font-size: 1rem;}
</style>
