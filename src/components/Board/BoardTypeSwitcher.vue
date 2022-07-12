<template>
    <div class="boards__types">
        <div @click="filter('all', $event)" class="boards__type active">Все</div>
        <div @click="filter('Личная', $event)" class="boards__type">Приватные</div>
        <div @click="filter('Для друзей', $event)" class="boards__type">Для участников</div>
        <div @click="filter('Общая', $event)" class="boards__type">Публичные</div>
    </div>
</template>

<script>
export default {
    name: 'BoardTypeSwitcher',
    methods: {
        filter(query, e) {
            const types = Array.from(document.getElementsByClassName('boards__type'))
            types.forEach(type => type.classList.remove('active'))
            e.currentTarget.classList.add('active')
            this.$emit('filter', query)
        }
    }
}
</script>

<style lang="scss" scoped>
.boards {width: 61.822916rem;}
.boards__wrapper {
    @include flex(space-between, center);
    margin: 0 0 1.4583rem 0;
}
.boards-line {
    &::before {
        content: "";
        position: absolute;
        top: 1.6rem;
        width: 100%;
        height: .15625rem;
        background-color: #EEEEEE;
    }
}
.boards__types {
    position: relative;
    @include flex(initial, center);
    @extend .boards-line;
}
.boards__type {
    @include font-size(18);
    color: $color-gray;
    cursor: pointer;
    margin: 0 1.35416rem 0 0;
    &:last-child {margin: 0;}
}
.boards__type.active {
    color: $color-sky;
    font-weight: 500;
    position: relative;
    width: max-content;
    @extend .boards-line;
    &::before {background-color: $color-sky;}
}

@media only screen and (max-width: 480px) {
    .boards__types {
        overflow-x: auto;
        overflow-y: hidden;
    }
    .boards__type {min-width: max-content}
}
</style>
