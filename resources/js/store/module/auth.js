export default {
    namespaced: true,
    state: {
        is_auth:false,
    },
    getters: {

    },
    actions: {
        setAuthStatus({ commit }) {
            commit("setAuthStatus");
        },
    },
    mutations: {
        setAuthStatus(state) {
            state.is_auth = true;
        }
    },
}