import DirectoryService from '@/services/DirectoryService'

export default {
    namespaced: true,
    state: () => ({
        directory: null
    }),
    actions: {
        async getDirectory(ctx) {
            try {
                const directory = await DirectoryService.get()
                ctx.commit('setDirectory', directory)
            } catch (e) {throw e}
        }
    },
    mutations: {
        setDirectory: (state, payload) => state.directory = payload
    },
    getters: {
        getDirectory: state => state.directory
    }

}
