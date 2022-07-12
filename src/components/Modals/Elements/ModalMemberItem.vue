<template>
    <div class="member" @click="switchRender" @contextmenu.prevent="switchRender">
        <div class="member__name">{{user.fullName}}</div>
        <div v-if="user.id === board.owner" class="member__persmission">владелец</div>
        <div v-else-if="user.role === Role.ADMIN" class="member__persmission">администратор</div>
        <div v-else-if="user.role === Role.CONTROL" class="member__persmission">контроль</div>
        <div v-else-if="user.role === Role.EXECUTOR" class="member__persmission">исполнитель</div>
        <div v-else-if="user.role === Role.VIEWER" class="member__persmission">участник</div>
        <ModalMemberActionMenu v-if="render" @close="switchRender" :user="user"/>
    </div>
</template>

<script>
    import ModalMemberActionMenu from "@/components/Modals/Elements/ModalMemberActionMenu"
    export default {
        name: 'ModalMemberItem',
        data: () => ({render: false}),
        props: {
            user: Object
        },
        computed: {
            board() {return this.$store.getters['board/getBoard']}
        },
        methods: {
            switchRender() {this.render = !this.render},
        },
        components: {ModalMemberActionMenu},
    }
</script>

<style lang="scss" scoped>
    .member {
        @include flex(space-between, center);
        @include font-size(16);
        position: relative;
        &:hover &__name {color: #B3B3B4;}
        padding: 0 1rem 0 0;
        margin: 0 0 1.66rem 0;
        cursor: pointer;
    }
    .member__name {transition: .2s all ease;}

    @media only screen and (max-width: 768px) {
        .member {margin: 0 0 .5rem 0;}
    }
</style>
