import {defineStore} from "pinia"

export const useUserStore=defineStore("user",{
    state:()=>({
        userID:null,
        email:null,
        firstname:null,
        lastname:null,
        likedBookmarks:[],
        userBookmarks:[]
    }),
    getters:{
        isLogged(state){
            if(state.userID!=null) return true
            return false
        }
    },
    persist:true
})