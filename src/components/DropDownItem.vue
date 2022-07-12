<template>
    <div ref="list" class="dropdown-list">
        <div class="dropdown-visible" @click="render">
            <span>Вопрос</span>
            <img class="dropdown-icon" src="@/assets/icon/dropdown.svg"/>
        </div>
        <div class="dropdown-hidden">
            <div class="dropdown-inner">А ещё сделанные на базе интернет-аналитики выводы рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Учитывая ключевые сценарии поведения, внедрение современных методик позволяет выполнить важные задания по разработке укрепления моральных ценностей. С учётом сложившейся международной обстановки, граница обучения.</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropDownItem',
    methods: {
        render() {
            this.$refs['list'].classList.toggle('active')
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown-list {
    @include font-size(18, 160%);
    font-family: "PT Root UI", sans-serif;
    background-color: rgba(233, 234, 238, .5);
    border-radius: $br-default;
    color: #666161;
    user-select: none;
    margin: 0 0 .416rem 0;
}
.dropdown-visible {
    min-height: 2.916rem;
    @include flex(space-between, center);
    font-weight: 700;
    cursor: pointer;
    padding: 1.14583rem .9375rem;
}
.dropdown-icon {
    width: .625rem;
    transition: .5s transform ease;
}
.dropdown-hidden {
    max-height: 0;
    transition: .3s max-height ease;
    overflow: hidden;
}
.dropdown-inner {
    transition: .3s transform ease;
    transform: translateY(-150%);
    margin: 1.14583rem .833rem 1.875rem .833rem;
}
.dropdown-list.active .dropdown-hidden {
    border-top: 1px solid #DEDEDE;
    max-height: 200px;
}
.dropdown-list.active .dropdown-inner {transform: translateY(0);}
.dropdown-list.active .dropdown-icon {transform: rotate(-90deg);}
</style>
