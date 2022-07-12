<template>
    <router-link :to="`/board/${board.id}`" class="card">
        <div class="card__title">{{board.title}}</div>
        <img class="card__icon" src="@/assets/icon/private.svg"/>
    </router-link>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Board as IBoard} from "@/interfaces/board"

@Component
export default class Board extends Vue {

    @Prop({type: Object})
    private board!: IBoard

}
</script>

<style lang="scss" scoped>
    .card {
        width: 14.84375rem;
        height: 8.02083rem;
        @include flex(space-between, initial, column);
        background-color: #EEEEEE;
        border-radius: .52083rem;
        border: 1px solid #EEEEEE;
        padding: .83rem;
        margin: 0 .8rem 1.25rem 0;
        transition: background-color .5s;
        &:hover {background-color: transparent;}
        &:nth-of-type(4n + 4) {margin-right: 0;}
    }
    .card__title {
        @include font-size(20);
        font-weight: 500;
        word-wrap: break-word;
        color: $primary-text;
    }
    .card__icon {
        width: 1.25rem;
        height: 1.25rem;

    }

    @media only screen and (max-width: 768px) {
        .card {
            width: 10.72916rem;
            height: 8.072916rem;
            &:nth-of-type(4n + 4) {margin-right: .8rem;}
            &:nth-of-type(3n + 3) {margin-right: 0;}
        }
    }

    @media only screen and (max-width: 480px) {
        .card {
            width: 100%;
            height: 8.072916rem;
            margin-right: 0;
            &:nth-of-type(4n + 4) {margin-right: 0;}
            &:nth-of-type(3n + 3) {margin-right: 0;}
        }
    }
</style>
