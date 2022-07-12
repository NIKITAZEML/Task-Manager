<template>
    <div class="search">
        <input ref="input" v-model="search" class="search__input modal-form-input mb-0" placeholder="Поиск задач"/>
        <svg v-if="search" @click="clear" class="search__clear" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.94883 0.496826L0.548828 1.89683L6.14883 7.49683L0.548828 13.0968L1.94883 14.4968L7.54883 8.89683L13.1488 14.4968L14.5488 13.0968L8.94883 7.49683L14.5488 1.89683L13.1488 0.496826L7.54883 6.09683L1.94883 0.496826Z" fill="#838F9F"/>
        </svg>
        <div class="search__list" ref="list">
            <router-link v-show="render" class="list__item" :to="`/board/${item.board_id}?taskId=${item.id}`" v-for="(item, i) of searchList" :key="i">
                <div class="item__title">{{item.board}} <i class="el-icon-data-board"></i></div>
                <div class="item__text">{{item.title}}</div>
            </router-link>
            <div v-if="search.length && !searchList.length" class="search__alert">По запросу <span>{{search}}</span> совпадений не найдено</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardGlobalSearch',
    data: () => ({
        search: '',
        render: false,
    }),
    computed: {
        tasks() {return this.$store.getters['task/getTasks'] || []},
        searchList() {
            const regExp = new RegExp(this.search, 'i')
            if (!this.search) return []
            return this.tasks.filter(item => regExp.test(item.title) || regExp.test(item.board)) || []
        }
    },
    methods: {
        clear() {
            this.search = ''
        },
        switchRender(v) {typeof v === 'boolean' ? this.render = v : this.render = !this.render}
    },
    mounted() {
        const {$refs} = this
        const ACTIVE_TRIGGER = 'active'
        const input = $refs['input']
        const list = $refs['list']
        document.addEventListener('click', ({target}) => !(list.contains(target) || target === list) && !list.classList.contains(ACTIVE_TRIGGER) ? this.switchRender(false) : null)
        input.addEventListener('focus', () => {
            this.switchRender(true)
            list.classList.add(ACTIVE_TRIGGER)
        })
        input.addEventListener('focusout', () => list.classList.remove(ACTIVE_TRIGGER))
    },
    created() {
        this.$store.dispatch('task/getAll')
    }
}
</script>

<style scoped lang="scss">
.text-clip {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.search {
    width: 100%;
    margin: 0 0 1rem 0;
    position: relative;
}
.search__clear {
    @include position(absolute, 96%, 25%);
    cursor: pointer;
    transition: $transition-default;
    &:hover {
        transform: scale(0.90);
    }
    &:hover path {fill: $color-red;}
}
.search__input {
    width: inherit;
    color: $color-gray;
}
.search__alert {
    @extend .text-clip;
    width: 100%;
    display: block;
    margin: 0 auto;
    text-align: center;
    @include font-size(20);
    color: $color-gray;
    background-color: white;
    padding: 1rem .5rem;
    border-radius: $br-default;
    border-bottom: 1px solid black;
    span {
        font-weight: 500;
        color: $primary-text;
    }
}
.search__list {
    width: 100%;
    max-height: 400px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 2.083rem;
    background-color: white;
    z-index: $position-def-index;
    overflow: auto;
    overflow-x: hidden;
    padding: 0 .5rem;
}
.list__item {
    padding: .5rem 1rem;
    border-bottom: 1px solid $color-gray;
    transition: $transition-default;
    line-height: 150%;
    &:hover {
        background-color: #F4F4F4;
        transform: translate(10px);
    }
}
.item__title {
    @include font-size(18);
    font-weight: 600;
}
.item__text {
    @include font-size(16);
    @extend .text-clip;
}
</style>
