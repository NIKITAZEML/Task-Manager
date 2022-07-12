<template>
    <div class="modal">
        <div class="modal__heading" @click="$emit('close')">
            <div class="modal__title">{{heading}}</div>
            <svg class="modal__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.0504 6.38475C24.318 7.08899 24.318 8.67307 23.0504 9.37731L21.4237 10.281L23.0504 11.1847C24.318 11.889 24.318 13.473 23.0504 14.1773L21.4237 15.081L23.0504 15.9847C24.318 16.689 24.318 18.273 23.0504 18.9773L13.389 24.3447C12.5819 24.7931 11.4203 24.7931 10.6132 24.3447L0.951817 18.9773C-0.315808 18.273 -0.315808 16.689 0.951817 15.9847L2.57852 15.081L0.951817 14.1773C-0.315808 13.473 -0.315808 11.889 0.951817 11.1847L2.5785 10.281L0.951817 9.37731C-0.315808 8.67307 -0.315808 7.08899 0.951817 6.38475L10.6132 1.01731C11.4203 0.568936 12.5819 0.568936 13.389 1.01731L23.0504 6.38475ZM13.389 14.7447L18.9528 11.6538L20.8018 12.681L18.9527 13.7083L16.4818 15.081L12.2234 17.4467C12.1412 17.4924 11.861 17.4924 11.7788 17.4467L7.52042 15.081L5.04947 13.7083L3.20042 12.681L5.04945 11.6538L10.6132 14.7447C11.4203 15.1931 12.5819 15.1931 13.389 14.7447ZM5.04947 16.4538L3.20042 17.481L11.7788 22.2467C11.861 22.2924 12.1412 22.2924 12.2234 22.2467L20.8018 17.481L18.9527 16.4538L13.389 19.5447C12.5819 19.9931 11.4203 19.9931 10.6132 19.5447L5.04947 16.4538ZM11.7788 3.11529C11.861 3.06961 12.1413 3.06961 12.2235 3.11529L20.8018 7.88103L12.2235 12.6468C12.1413 12.6925 11.861 12.6925 11.7788 12.6468L3.20046 7.88103L11.7788 3.11529Z" fill="#838F9F"/>
            </svg>
        </div>
        <div v-loading="loading">
            <div class="modal__items">
                <div v-for="item of filters" :key="item.value" class="modal__item" @click="filter(item.value)">
                    <img v-if="item.active" class="modal__radio" src="@/assets/icon/filter-active.svg"/>
                    <img v-else class="modal__radio" src="@/assets/icon/filter-disable.svg"/>
                    <div class="modal__name">{{item.title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {EventSystem} from "@/config/event.ts"
import {mapGetters} from "vuex"
import {EventBus} from "@/main"
import {dispatch} from '@/store'

export default {
    name: 'BaseTemplateModalMenu',
    props: {
        action: {
            type: Function,
            required: true
        },
        heading: {
            type: String,
            required: true
        },
        filters: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        loading: false,
    }),
    computed: {
        id() {return +this.$route.params.id},
        ...mapGetters({
            query: ['tab/getTaskActive'],
        })
    },
    methods: {
        filter(value) {
            this.filters.map(item => item.value === value ? item.active = true : item.active = false)
            this.loading = true

            this.action(value).then(() => {
                dispatch('board/getById', this.id).then(() => {
                    EventBus.$emit(EventSystem.BOARD_CLEAR_SEARCH)
                    this.loading = false
                })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.modal {
    width: 16.302083rem;
    @include position(absolute, -15rem, 1.25rem, $modal-actions-index);
    background-color: #F9F9F9;
    border-radius: .520833rem;
    border: 1px solid #E5E5E5;
    filter: drop-shadow(0 0 .52083rem rgba(0, 0, 0, 0.1));
}
.modal__layer {
    width: 100vw;
    height: 100%;
    @include position(fixed, 0, 0, $modal-index);
    background-color: red;
    opacity: .2;
}
.modal__heading {
    @include flex(space-between, center);
    padding: 1.302083rem .78125rem;
    border-bottom: 1px solid #E5E5E5;;
}
.modal__title {
    @include font-size(18);
    color: #B3B3B4;
}
.modal__icon {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    margin: 0 1.25rem 0 0;
    &:last-child {margin: 0;}
    @extend .path-hover;
}
.modal__items {
    @include flex(initial, initial, column);
    padding: .9375rem .833rem 1.4583rem .833rem;
}
.modal__radio {
    width: 1.0416rem;
    margin: 0 .625rem 0 0;
}
.modal__item {
    @include flex(initial, center);
    cursor: pointer;
    margin: 0 0 1.0416rem 0;
    &:last-child {margin: 0;}
}
</style>
