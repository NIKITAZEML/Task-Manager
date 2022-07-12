<template>
    <BoardTemplate>
        <div class="revision">
            <el-button v-if="view" @click="view = !view" class="revision__btn" size="small" type="success" round>Сформировать ревизию</el-button>
            <div class="revision__grid" v-if="!view">
                <div class="revision__col">
                    <div class="revision__inner">
                        <BoardViewGrid v-if="render" :list="lastVersionProjects"/>
                    </div>
                </div>
                <div class="revision__col">
                    <div class="revision__inner">
                        <BoardViewGrid v-if="render" :list="newVersionProjects"/>
                    </div>
                </div>
            </div>
        </div>
    </BoardTemplate>
</template>

<script>

import BoardTemplate from "@/components/Board/BoardTemplate"
import BoardViewGrid from "@/components/Board/views/grid/BoardViewGrid"
import {mapGetters} from 'vuex'
import Storage from "@/helpers/storage/Storage"
import {BOARD_REPRESENTATION} from '@/config/app'


export default {
    watch: {
        'projects': function () {
            this.$store.commit('board/setRevisionMode', true)
            this.render = false
            this.$nextTick(() => this.render = true)
        },
    },
    data: () => ({
        render: true,
        view: true,
    }),
    computed: {
        id() {return this.$route.params.id},
        ...mapGetters({
            projects: ['project/getProjects'],
            query: ['tab/getTaskActive'],
            versions: ['board/getVersions'],
        }),
        lastVersionProjects() {
            let trigger = this.render
            return this.getProjectsByVersion(0)
        },
        newVersionProjects() {
            let trigger = this.render
            return this.getProjectsByVersion(1)
        }
    },
    methods: {
        getProjectsByVersion(v) {
            let {projects} = Storage.getJson('board')
            projects = projects.map(p => {
                if (p.tasks)
                    p.tasks = p.tasks.filter(task => task.version === this.versions[v])
                return p
            }).filter(p => p)
            return projects
        },
    },
    created() {
        const {dispatch, commit} = this.$store

        localStorage.setItem('representation', BOARD_REPRESENTATION.GRID)
        this.$store.commit('tab/setRepresentationActive', BOARD_REPRESENTATION.GRID)

        commit('board/setRevisionMode', true)
        dispatch('board/saveBoardVersions', this.id)
        dispatch('board/triggerRevision', this.id)
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('board/setRevisionMode', false)
        next()
    },
    components: {BoardTemplate, BoardViewGrid}
}
</script>

<style lang="scss" scoped>
.revision__btn {
    display: block;
    margin: 0 auto;
}
.revision__grid {
    @include flex(space-between);
}
.revision__col {
    @include flex(center);
    width: 48%;
    &:first-child {background-color: #EEEEEE;}
    &:last-child {background-color: #E2FFEE;}
    border-radius: $br-default;
    padding: 1.0416rem 0;
}
.revision__inner {width: 88%;}

@media only screen and (max-width: 768px) {
    .revision__grid {@include flex(center, initial, column);}
    .revision__col {width: 100%;}
    .revision__inner {width: 100%;}
}
</style>
