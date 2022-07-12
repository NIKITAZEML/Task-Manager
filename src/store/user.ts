import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import {User, Role} from '@/interfaces/user'

export default {
    namespaced: true,
    state: () => ({
        auth: false,
        user: {} as User,
        role: null as Role
    }),
    actions: {
        async signup(ctx, payload) {
            try {
                const user: User = await AuthService.signup(payload)
                return <User>user
            } catch (e) {throw e.response.data}
        },
        async login(ctx, payload) {
            try {
                const user: User = await AuthService.login(payload)
                ctx.commit('setUser', user)
                return <User>user
            } catch (e) {throw e.response.data}
        },
        logout: AuthService.logout,
        async getProfile(ctx) {
            try {
                const user: User = await UserService.getProfile()
                ctx.commit('setUser', user)
            } catch (e) {throw e}
        },
        async updateProfile(ctx, payload) {
            try {
                const user: User = await UserService.updateProfile(payload)
                ctx.commit('setUser', user)
                return <User>user
            } catch (e) {throw e}
        },
        async refreshPassword(ctx, payload) {
            try {
                return await AuthService.refreshPassword(payload)
            } catch (e) {throw e.response.data}
        }
    },
    mutations: {
        auth: (state, payload) => state.auth = payload,
        setUser: (state, payload) => state.user = payload,
        setRole: (state, payload) => state.role = payload
    },
    getters: {
        auth: state => state.auth,
        getUser: state => state.user,
        getRole: state => state.role
    }
}
