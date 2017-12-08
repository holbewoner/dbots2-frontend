import axios from '~/plugins/axios'

export const state = () => ({
    token: null,
    user: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
        if(process.browser) {
            createCookie("tkn", token)
        }
    },
    setUser(state, user) {
        state.user = user
    },
    logout(state) {
        state.token = null
        state.user = null
        if(process.browser) {
            eraseCookie("tkn")
        }
    }
}

export const actions = {
    nuxtServerInit({ dispatch }, { req }) {
        if(req.headers.cookie) {
            return dispatch("checkCookie", req.headers.cookie)
        }
    },
    checkCookie({ state, commit, dispatch }, cookie) {
        if(state.token) {
            return
        }
        var tkn = readCookie("tkn", cookie)
        if(tkn) {
            commit("setToken", tkn)
            return dispatch("getCurrentUser")
        }
    },
    getCurrentUser({ state, commit }) {
        return axios.get("/users/@me", {
            headers: {
                Authorization: state.token
            }
        }).then((res) => {
            commit("setUser", res.data)
        })
    },
    login({ commit, dispatch }, data) {
        return axios.post("/login", {
            code: data.code,
            redirect_uri: data.redirectURI
        }).then((res) => {
            commit("setToken", res.data.token)
        })
    },
    logout({ commit }) {
        commit("logout")
    }
}

// https://stackoverflow.com/a/24103596
function createCookie(name, value, days, suffix) {
    var expires = "";
    if(days > 0) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    if(suffix) {
        suffix = "; " + suffix;
    } else {
        suffix = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/" + suffix;
}
function readCookie(name, cookie) {
    var nameEQ = name + "=";
    var ca = (cookie || document.cookie).split(";");
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == " ") {
            c = c.substring(1, c.length);
        }
        if(c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
