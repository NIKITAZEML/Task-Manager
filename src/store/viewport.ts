export default {
    namespaced: true,
    state: () => ({
        isTablet: window.innerWidth <= 768,
        isMobile: window.innerWidth <= 480
    }),
    mutations: {
        isTablet: (state, payload) => state.isTablet = payload,
        isMobile: (state, payload) => state.isMobile = payload
    },
    getters: {
        isTablet: state => state.isTablet,
        isMobile: state => state.isMobile
    }
}
