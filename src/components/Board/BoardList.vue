<template>
    <div class="boards">
        <AccountTitle>Доступные доски</AccountTitle>
        <BoardGlobalSearch/>
        <div class="boards__wrapper">

            <BoardTypeSwitcher @filter="key => filter = key"/>

            <div @click="EventBus.$emit(EventSystem.SWITCH_MODAL_CREATION_BOARD, {action: ModalAction.CREATE})" class="btn">
                <div class="btn__text">Создать доску</div>
                <svg class="btn__icon" width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24.8545" r="24" fill="#01A2FD"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.99 16.0455L23.0101 16.0455L23.0101 23.9651L15.0905 23.9651V25.945L23.0101 25.945L23.0101 33.8646L24.99 33.8646L24.99 25.945H32.9096V23.9651H24.99L24.99 16.0455Z" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="boards__cards">
            <Board v-for="(board, i) of filterBoards" :key="i" :board="board"/>
        </div>
    </div>
</template>

<script>
    import Board from "@/components/Board/Board"
    import {mapGetters} from 'vuex'
    import AccountTitle from "@/components/Account/AccountTitle"
    import BoardGlobalSearch from "@/components/Board/BoardGlobalSearch"
    import BoardTypeSwitcher from "@/components/Board/BoardTypeSwitcher"
    import {dispatch, commit} from '@/store'
    import {BOARD_TYPES} from "@/config/app.ts"

    export default {
        name: 'BoardList',
        data: () => ({
            filter: 'all'
        }),
        computed: {
            ...mapGetters({
                boards: ['board/getBoards'],
            }),
            filterBoards() {
                const filters = BOARD_TYPES.map(type => type[0])
                if (this.filter === 'all')
                    return this.boards
                for (let filter of filters)
                    if (this.filter === filter)
                        return this.boards.filter(board => board.status === filter)
                return []
            }
        },
        created() {
            dispatch('board/getAll')
        },
        beforeDestroy() {
            commit('project/setProjects', [])
            commit('task/setTasks', [])
        },
        components: {AccountTitle, Board, BoardGlobalSearch, BoardTypeSwitcher}
    }
</script>

<style lang="scss" scoped>
    .boards {width: 61.822916rem;}
    .boards__wrapper {
        @include flex(space-between, center);
        margin: 0 0 1.4583rem 0;
    }
    .btn {
        @include flex(initial, center);
        cursor: pointer;
        &:hover svg {stroke: $color-sky;}
        &:hover circle {fill: transparent;}
        &:hover path {fill: $color-sky;}
    }
    .btn__icon {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 0 0 .83rem;
        border: none;
        circle, path {transition: .5s all;}
    }
    .btn__text {
        @include font-size(18);
        color: $color-gray;
    }
    .boards__cards {@include flex(initial, initial, initial, wrap);}

    @media only screen and (max-width: 768px) {
        .btn {display: none;}
        .boards {width: 100%;}
    }
</style>
