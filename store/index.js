export const state = () => ({
})

export const mutations = {
}

export const actions = {
    async nuxtServerInit({ dispatch }, data) {
        await dispatch("auth/nuxtServerInit", data)
    }
}
