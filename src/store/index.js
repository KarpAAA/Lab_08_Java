import {createStore} from 'vuex'
import axios from "axios";
import VuexPersist from "vuex-persist"
const vuexPersist = new VuexPersist({
    key: 'user', // unique key for saving state properties in the browser storage
    storage: window.localStorage, // select the type of storage used (eg - localStorage, sessionStorage, etc)
    reducer: (state) => ({ jwtToken: state.jwtToken}) // select the state properties that you want persisted
})


const store = createStore({
    state() {
        return {
            jwtToken: "",
            allSkills: [],
            cook:{},
            user: {},

            restaurant: {
                cooks: [],
                orders: [],
                cashRegisters: [],
                completedOrders: []
            }
        }
    },
    getters: {
        getRestaurant(state) {
            return state.restaurant;
        },
        getCooks(state) {
            return state.restaurant.cooks;
        },
        getOrders(state) {
            return state.restaurant.completedOrders;
        }
    },
    mutations: {
        setJwt(state, token) {
            state.jwtToken = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setCooks(state, cooks) {
            state.restaurant.cooks = cooks;
        },
        setCook(state, cook) {
            state.cook = cook;
        },
        setCashRegisters(state, cashRegisters) {
            state.restaurant.cashRegisters = cashRegisters;
        },
        setCompletedOrders(state, completedOrders) {
            state.restaurant.completedOrders = completedOrders;
        },
        setAllSkills(state, allSkills) {
            state.allSkills = allSkills;
        }
    },
    actions: {
        updatePaydesk({state, dispatch}, updateInfo){
            axios.post("http://localhost:8081/paydesk/update", updateInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getRestaurant');
                }).catch(error => {
                console.error(error);
            });

        },
        loginToAccount({commit}, loginInfo) {
            commit('setUser', {});
            axios.post("http://localhost:8081/auth",
                {
                    username: loginInfo.login,
                    password: loginInfo.password
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data.jwtToken.token);
                    console.log(response.data.user);
                    commit('setJwt', response.data.jwtToken.token);
                    commit('setUser', response.data.user);
                }).catch(error => {
                console.error(error);
            });
        },
        getRestaurant({state, commit}) {

            axios.get("http://localhost:8081/restaurant"
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    commit('setCashRegisters', response.data.paydesks)
                    commit('setCooks', response.data.cooks)
                    commit('setCompletedOrders', response.data.completedOrders)
                    console.log(response.data.completedOrders);
                }).catch(error => {
                console.error(error);
            });
        },
        updateCook({state, dispatch}, updateInfo){
            axios.post("http://localhost:8081/cook/update", updateInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getRestaurant');
                }).catch(error => {
                console.error(error);
            });
        },
        releaseCook({state, dispatch}, deleteInfo){
            axios.post("http://localhost:8081/cook/release", deleteInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getRestaurant');
                }).catch(error => {
                console.error(error);
            });
        },
        getCookByUsername({state, commit}){
            axios.get("http://localhost:8081/cook/username?username=" +state.user.name,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    commit('setCook', response.data)
                }).catch(error => {
                console.error(error);
            });
        },
        getAllSkills({state, commit}){
            axios.get("http://localhost:8081/skills",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data.skills);
                    commit('setAllSkills', response.data.skills)
                }).catch(error => {
                console.error(error);
            });
        },
    },
    plugins: [vuexPersist.plugin]
})
export default store;