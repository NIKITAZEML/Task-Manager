<template>
    <Isotope v-if="render" ref="isotope" :options="{layoutMode: 'waterflow'}" :list="projects" item-selector="card">
        <Project v-for="(project, i) of projects" :key="i" :project="project"/>
    </Isotope>
</template>

<script lang="ts">
import {Component, Vue, Ref, Watch} from 'vue-property-decorator'
import Isotope from 'vueisotope'
import Project from "@/components/Board/views/grid/Project.vue"
import {Project as IProject} from '@/interfaces/project'
import {EventBus} from "@/main"
import {EventSystem} from "@/config/event.ts"
import {getters} from '@/store'
import '@/plugins/waterflow'

@Component({
    components: {Isotope, Project}
})
export default class BoardViewGrid extends Vue {

    @Watch('projects')
    callback() {
        this.render = false
        this.$nextTick(() => this.render = true)
    }

    private render: boolean = true

    private get projects(): IProject[] {return getters['project/getProjects']}

    @Ref('isotope')
    private isotope: Isotope

    mounted() {EventBus.$on(EventSystem.BOARD_REARRANGE, () => this.isotope.arrange())}

    beforeDestroy() {EventBus.$off(EventSystem.BOARD_REARRANGE)}

}


</script>
