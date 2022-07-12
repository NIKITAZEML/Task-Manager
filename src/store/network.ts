export default {
    namespaced: true,
    state: {
        online: true
    },
    mutations: {
        setOnline: (state, payload) => state.online = payload
    },
    getters: {
        getOnline: state => state.online
    }
}
