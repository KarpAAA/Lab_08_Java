import {createStore} from 'vuex'
import axios from "axios";
import VuexPersist from "vuex-persist"
const vuexPersist = new VuexPersist({
    key: 'user', // unique key for saving state properties in the browser storage
    storage: window.localStorage, // select the type of storage used (eg - localStorage, sessionStorage, etc)
    reducer: (state) => ({ jwtToken: state.jwtToken, user: state.user, cook: state.cook}) // select the state properties that you want persisted
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
                menu:[],
                clients: [],
                cashRegisters: [],
                completedOrders: [],
                currentOrders:[],
                income:{}
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
        setIncome(state,income){
          state.restaurant.income = income;
        },
        setUser(state, user) {
            state.user = user;
        },
        setCooks(state, cooks) {
            state.restaurant.cooks = cooks;
        },
        setClients(state, clients) {
            state.restaurant.clients = clients;
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
        },
        setMenu(state, menu) {
            state.restaurant.menu = menu;
        },
        setCurrentOrders(state, currentOrders){
            state.restaurant.currentOrders = currentOrders;
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
        loginToAccount({commit, dispatch}, loginInfo) {
            commit('setUser', {});
            dispatch('getRestaurant');
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
                    commit('setClients', response.data.clients)
                    commit('setMenu', response.data.menu)
                    commit('setCurrentOrders', response.data.currentOrders)
                    commit('setIncome', response.data.income)
                    console.log(response.data);
                }).catch(error => {
                console.error(error);
            });
        },
        createCook({state, dispatch}, cookInfo){
            axios.post("http://localhost:8081/cook/create", cookInfo,
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
        cookLearnSkill({state,dispatch}, skillInfo){
            axios.post("http://localhost:8081/skills/new", skillInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getCookByUsername');
                }).catch(error => {
                console.error(error);
            });
        },
        doOrderPizzaStep({state,dispatch}, info){
            axios.post("http://localhost:8081/order/step", info,
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
        standToQueue({dispatch}, info){
            axios.post("http://localhost:8081/paydesk/queue/stand", info,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getRestaurant');
                }).catch(error => {
                console.error(error);
            });
        },
        leaveFromQueue({dispatch}, info){
            axios.post("http://localhost:8081/paydesk/queue/leave", info,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    console.log(response.data);
                    dispatch('getRestaurant');
                }).catch(error => {
                console.error(error);
            });
        },
        generateClient({dispatch,state}){
            axios.post("http://localhost:8081/client/new",
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
        }
    },
    plugins: [vuexPersist.plugin]
})
setInterval(() => {
    store.dispatch('getRestaurant');
}, 5000);

setInterval(() => {
    store.dispatch('generateClient');
}, 10000);
export default store;