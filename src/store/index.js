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
                stat:{}
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
        setStat(state,stat){
          state.restaurant.stat = stat;
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
        changeStrategyToDefault({state}){
            axios.get("http://localhost:8081/strategies/default",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                });
        },
        changeStrategyToOther({state}){
            axios.get("http://localhost:8081/strategies/other",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
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
                    commit('setJwt', response.data.jwtToken.token);
                    commit('setUser', response.data.user);
                }).catch(error => {
                console.error(error);
            });
        },
        getRestaurant({state}) {
            axios.get("http://localhost:8081/restaurant"
                , {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + state.jwtToken
                    }
                })
               .catch(error => {
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
        },
        savePizza({dispatch,state},pizzaInfo){
            axios.post("http://localhost:8081/pizza",pizzaInfo,
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
        deletePizza({dispatch,state},pizzaInfo){
            axios.post("http://localhost:8081/pizza/delete",pizzaInfo,
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

export default store;