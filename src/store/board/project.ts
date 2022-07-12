import {Project} from '@/interfaces/project'
import {Task} from '@/interfaces/task'
import ProjectService from '@/services/ProjectService'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        projects: [] as Project[],
        project: {} as Project
    },
    actions: {
        async getById(ctx, id: number) {
            try {
                const project: Project = await ProjectService.getById(id)
                ctx.commit('setProject', project)
                ctx.commit('projectFile/setFiles', project.files, {root: true})
            } catch (e) {throw e}
        },
        async create(ctx, {id, params}) {
            try {
                const project: Project = await ProjectService.create(id, params)
                ctx.commit('add', project)
            } catch (e) {throw e}
        },
        async update(ctx, {id, params}) {
            try {
                const project: Project = await ProjectService.update(id, params)
                console.log(project)
                ctx.commit('update', project)
            } catch (e) {throw e}
        }
    },
    mutations: {
        update(state, payload: Project) {
            let project: Project = state.projects.find(p => p.id === payload.id)
            project = Object.assign(project, payload)
        },
        setProjects: (state, payload: Project[]) => state.projects = payload,
        setProject: (state, payload: Project) => state.project = payload,
        add(state, project: Project) {
            state.projects.push(project)
        }
    },
    getters: {
        getProjects: state => <Project[]>state.projects,
        getProject: state => <Project>state.project
    }
}
