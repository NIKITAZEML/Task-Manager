import api from '@/helpers/http/api'
import {Project} from '@/interfaces/project'
import ProjectFileService from '@/services/ProjectFileService'

interface IProjectService {}

class ProjectService implements IProjectService {

    private projectFileService

    constructor() {
        this.projectFileService = ProjectFileService
    }

    async getById(id: number): Promise<Project> {
        const res = await api.get(`/project/${id}/`)
        return <Project>res.data
    }

    async create(id: number, payload: Project) {
        const {files} = payload
        const res = await api.post(`/board/${id}/create-project/`, payload)
        const project: Project = res.data

        if (files) await this.projectFileService.uploadAll(project.id, files)
        return project
    }

    async update(id: number, payload: Project): Promise<Project> {
        const res = await api.put(`/project/${id}/`, payload)
        return <Project>res.data
    }

}

export default new ProjectService()
