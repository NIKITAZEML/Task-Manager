<template>
    <ModalTaskSearchField>
        <slot></slot>
        <ul v-if="users.length" class="search-input-layer">
            <li @click="select(member)" v-for="(member, i) of findMembers" :key="i" class="search-input-item">{{member.fullName}}</li>
        </ul>
    </ModalTaskSearchField>
</template>

<script>
import ModalTaskSearchField from "@/components/Modals/Elements/search/ModalTaskSearchField"
import {mapGetters} from 'vuex'

export default {
    name: 'SearchExecutors',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            task: ['task/getTask']
        }),
        users() {return this.task.users || []},
        findMembers() {
            const exp = new RegExp(this.item.fullName || '', 'ig')
            return this.users.filter(item => exp.test(item.fullName))
        }
    },
    methods: {
        select(member) {
            this.$emit('select', {
                id: this.item.id,
                fullName: member.fullName,
                executorId: member.id
            })
        },
    },
    components: {ModalTaskSearchField}
}
</script>
