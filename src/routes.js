import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Account from "./views/Account.vue";
import Bookmarks from "./views/Bookmarks.vue";
import AccountInfo from "./views/AccountInfo.vue";
import FavBookmarks from "./views/FavBookmarks.vue"
import NewBookmark from "./views/NewBookmark.vue"
import {pinia } from "./pinia.js"
import { useUserStore } from "./stores/userStore";
import MyBookmarks from "./views/MyBookmarks.vue"
import EditBookmark from "./views/EditBookmark.vue"
const liked={
    template: `<div class="account-info col-sm-9 col-12 d-flex justify-content-center pt-3 align-items-start">
    <h2>Beğenilenler<h2>
        </div>`,
}
const fav={
    template: `<div class="account-info col-sm-9 col-12 d-flex justify-content-center pt-3 align-items-start">
    <h2>Favoriler<h2>
        </div>`,
}
const routes = [
  {
    path: "/",
    component: Home,
    name: "HomePage",
    children: [
      {
        path: "bookmarks/:cat",
        component: Bookmarks,
      },
    ],
  },
  {
    path: "/giris",
    component: Login,
    name: "LoginPage",
  },
  {
    path: "/kayit",
    component: Register,
    name: "RegisterPage",
  },
  {
    path: "/hesap",
    component: Account,
    name: "Account",
    children: [
      {
        path: "hesapbilgileri",
        component: AccountInfo,
        name:"AccountInfoPage"
      },
      {
        path: "favoriler",
        component:FavBookmarks,
        name:"FavoritesPage"
      },
      {
        path:"bookmarklarim",
        component:MyBookmarks,
        name:"MyBookmarksPage"
      }
    ],
  },
  {
    path:"/yenifavori",
    component:NewBookmark,
    name:"NewBookmarkPage",
  },
  {
    path:"/bookmarkduzenle/:id",
    component:EditBookmark,
    name:"EditBookmarkPage"
  }
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to,from)=>{
  const user=useUserStore()
  const authRequiredPages=["NewBookmarkPage","Account","AccountInfo","FavoritesPage","LikesPage"]
  if(authRequiredPages.includes(to.name) && !user.isLogged){
    return {name:"LoginPage"}
  }
})
export default router;
