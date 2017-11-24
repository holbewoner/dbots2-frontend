import axios from '~/plugins/axios'

export const state = () => ({
    token: null,

    user: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setUser(state, user) {
        state.user = user
    },
    logout(state) {
        state.token = null
        state.user = null
    }
}

export const actions = {
    getCurrentUser({ state, commit }) {
        return axios.get("/users/@me", {
            headers: {
                Authorization: state.token
            }
        }).then((res) => {
            commit("setUser", res.data)
        })
    },
    login({ commit, dispatch }, code) {
        return axios.post("/login", {
            code
        }).then((res) => {
            commit("setToken", res.data.token)
        })
    },
    logout({ commit }) {
        commit("logout")
    }
}
