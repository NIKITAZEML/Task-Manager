const {commit} = '@/store'

export default {
    mounted() {
        const {error, success} = this.$message

        window.addEventListener('offline', () => {
            commit('network/setOnline', false)
            error({message: 'Соединение с сетью потеряно...'})
        })

        window.addEventListener('online', () => {
            commit('network/setOnline', true)
            success({message: 'Соединение восстановлено'})
        })
    }
}
