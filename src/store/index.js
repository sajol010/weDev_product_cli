import { createStore } from 'vuex'
import axios from "axios";
import router from "@/router";
// Create a new store instance.
const store = createStore({
    state: function () {
        return {
            isAuthenticated: localStorage.getItem('token')?true:false,
            token: localStorage.getItem('token')||''
        }
    },
    getters:{
        isAutenticated: state =>{
            return localStorage.getItem('token')?true:false
        },
        authToken: state =>{
            return state.token
        }
    },
    mutations: {
        setToken(state, token){

            localStorage.setItem('token', token)
        }
    },
    actions: {
        login({commit}, user){
            axios.post('/auth/login', user).then(function (response){
                let res = response.data
                if (res.status == 'OK'){
                    localStorage.setItem('token',  res.data.access_token)
                    commit('setToken', res.data.access_token)
                    router.push({path:'/products'});
                }
            });
        },
        logout({commit}, user){
            localStorage.removeItem('token');
            router.push({path:'Login'});
        }

    }
})

export default store;