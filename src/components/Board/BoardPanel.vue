<template>
    <div class="panel-layout">
        <div class="panel container">
            <div class="panel__wrapper">
                <div class="panel__btns">
                    <Avatar v-if="isTablet"/>
                    <router-link to="/boards" class="panel__link btn-action">Доски</router-link>
                </div>
                <CreateTaskBtn v-if="role === Role.ADMIN && (!isTablet || isMobile)"/>
                <div v-if="!isTablet" @click="openUpdateBoardModal(board.id)" class="board__wrapper">
                    <h2 class="board__title">{{board.title}}</h2>
                    <svg class="board__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9584 0.333313C10.3949 0.333313 10.8133 0.507593 11.1189 0.815595L13.1862 2.88286C13.494 3.19065 13.6669 3.60809 13.6669 4.04337C13.6669 4.47864 13.494 4.89609 13.1862 5.20387L5.6385 12.7492C5.17285 13.2863 4.51276 13.6163 3.75656 13.6682H0.333496V13.0015L0.335661 10.1915C0.392455 9.48854 0.719274 8.83487 1.21783 8.39559L8.79709 0.816398C9.10442 0.507199 9.5224 0.333313 9.9584 0.333313ZM3.70949 12.3365C4.06563 12.3113 4.39715 12.1456 4.66336 11.8411L9.70463 6.79979L7.20171 4.29678L2.1309 9.36637C1.8608 9.60526 1.6937 9.93947 1.66683 10.2452V12.3353L3.70949 12.3365ZM8.14463 3.35408L10.6474 5.85698L12.2434 4.26106C12.3011 4.20332 12.3335 4.12502 12.3335 4.04337C12.3335 3.96171 12.3011 3.88341 12.2434 3.82567L10.1742 1.75655C10.1172 1.69901 10.0395 1.66665 9.9584 1.66665C9.87734 1.66665 9.79964 1.69901 9.74255 1.75655L8.14463 3.35408Z" fill="#838F9F"/>
                    </svg>
                </div>
            </div>
            <BoardSearch v-if="!isTablet && !isMobile"/>
            <BoardMenu/>
            <CreateTaskBtn v-if="role === Role.ADMIN && isTablet && !isMobile"/>
        </div>
        <div v-if="isTablet" class="search-container container">
            <BoardSearch/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import CreateTaskBtn from "@/components/Board/CreateTaskBtn.vue"
import BoardMenu from "@/components/Board/Menu/BoardMenu.vue"
import BoardSearch from "@/components/Board/BoardSearch.vue"
import Avatar from "@/components/Avatar.vue"
import {mapGetters} from 'vuex'
import {BoardModalPayload, EventSystem, ModalAction} from "@/config/event"
import {EventBus} from "@/main"

@Component({
        computed: {
            ...mapGetters('board', {board: 'getBoard'}),
            ...mapGetters('user', {role: 'getRole'}),
            ...mapGetters('viewport', {
                isMobile: 'isMobile',
                isTablet: 'isTablet',
            })
        },
        components: {Avatar, CreateTaskBtn, BoardMenu, BoardSearch}
    })
    export default class BoardPanel extends Vue {

        public openUpdateBoardModal(id: number): void {
            const payload: BoardModalPayload = {id, action: ModalAction.UPDATE}
            EventBus.$emit(EventSystem.SWITCH_MODAL_EDITION_BOARD, <BoardModalPayload>payload)
        }

    }

</script>

<style lang="scss" scoped>
    .panel-layout {
        background-color: $primary-bg;
        padding: 1.302083rem 0;
        border-bottom: 1px solid $primary-border;
    }
    .panel__link {margin: 0 1.66rem 0 0;}
    .panel {@include flex(space-between, center);}
    .panel__wrapper {@include flex(space-between, center);}
    .panel__btns {@include flex(initial, center);}
    .board__wrapper {
        @include flex(space-between, center);
        cursor: pointer;
        @extend .path-hover;
    }
    .board__title {
        @include font-size(18);
        color: $primary-text;
        margin: 0 .52083rem 0 1.66rem;
        max-width: 20rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .board__icon {width: .72916rem;}
    .search-container {display: none;}

    @media only screen and (max-width: 768px) {
        .search-container {
            display: flex;
            margin-top: 1rem;
        }
        .panel__link {margin: 0 1.25rem;}
    }

    @media only screen and (max-width: 480px) {
        .panel {flex-wrap: wrap;}
        .panel__wrapper {
            width: 100%;
            margin: 0 0 .9375rem 0;
        }
        .board__wrapper {margin: 0 0 .9375rem 0;}
        .board__all {margin: 0;}
    }
</style>
