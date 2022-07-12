<template>
    <div class="">
        <el-tree :data="data"></el-tree>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {getters} from '@/store'

@Component
export default class Directory extends Vue {

    @Watch('directory')
    init() {
        // interface Directory {
        //     id: number
        //     title: string
        //     categories: DirectoryCategory[]
        // }
        // interface DirectoryCategory {
        //     id: number
        //     title: string
        //     users: Array<any>
        // }

        this.data = this.directory.map(section => {
            let children = []
            if (section.categories.length)
                children = section.categories.map(category => {
                    let users = []
                    if (category.users.length)
                        users = category.users.map(user => ({label: user.fullName}))
                    return {label: category.title, children: users}
                })
            return {label: section.title, children}
        })
    }

    private data = []

    private get directory() {return getters['directory/getDirectory']}

}
</script>

<style scoped lang="sass"></style>
