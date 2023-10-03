import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import HomePage from "@/pages/HomePage.vue";
import UserPage from "@/pages/UserPage.vue";

const routes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/main",
        component: MainPage
    },
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: '/user/:id',
        name: 'user',
        component: UserPage,
        props: true // Дозволяє передавати параметри як властивість компонента
    }
]


export default createRouter({
    routes: routes,
    history: createWebHistory()
});