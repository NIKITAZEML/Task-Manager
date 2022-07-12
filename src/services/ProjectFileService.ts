import api from '@/helpers/http/api'
import {Project} from '@/interfaces/project'

class ProjectFileService {

    async uploadAll(id: number, files): Promise<Project> {
        const body = new FormData()
        files.map(file => (!file.project ? body.append('files', file, file.name) : null))
        const res = await api.put(`/project/${id}/`, body)
        return <Project>res.data
    }

    async upload(id: number, file): Promise<Project> {
        const body = new FormData()
        body.append('files', file, file.name)
        const res = await api.put(`/project/${id}/`, body)
        return <Project>res.data
    }

    async delete(id: number, fileId): Promise<any> {
        return api.delete(`/project/${id}/delete-file/`, {data: {id: fileId}})
    }

}

export default new ProjectFileService()
