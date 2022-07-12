<template>
    <ModalTaskSearchField>
        <slot></slot>
        <ul v-if="projects.length" class="search-input-layer">
            <li v-if="item.title" @click="select(item.title)" v-for="(item, i) of findProjects" :key="i" class="search-input-item">{{item.title}}</li>
        </ul>
    </ModalTaskSearchField>
</template>

<script>
import ModalTaskSearchField from "@/components/Modals/Elements/search/ModalTaskSearchField"
import {mapGetters} from 'vuex'

export default {
    name: 'SearchExecutors',
    props: {
        value: {
            type: String,
            required: true,
            default: () => ''
        }
    },
    computed: {
        ...mapGetters({
            task: ['task/getTask']
        }),
        projects() {return this.task.projects || []},
        findProjects() {
            const exp = new RegExp(this.value || '', 'ig')
            return this.projects.filter(item => exp.test(item.title))
        }
    },
    methods: {
        select(project) {
            this.$emit('select', project)
        },
    },
    components: {ModalTaskSearchField}
}
</script>
