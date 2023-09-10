<template>
  <nav class="navbar fs-5 navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/"
        ><i class="bi bi-journal-bookmark"></i>BookLike</RouterLink
      >
      <div class="nav-items d-flex justify-content-end align-items-center w-25">
        <RouterLink
          v-if="user.isLogged"
          to="/yenifavori"
          class="btn btn-sm me-3 btn-secondary d-inline-block"
          >Yeni +</RouterLink
        >
        <div class="dropdown">
          <i
            class="bi bi-three-dots-vertical"
            id="account-menu-toggler"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <div
            class="account-menu w-50 dropdown-menu start-100"
            id="account-menu"
            style="transform: translateX(-100%)"
          >
            <div class="list-group text-start">
              <RouterLink
                to="/hesap/hesapbilgileri"
                class="dropdown-item"
                active-class="active"
                v-if="user.isLogged"
                ><i class="bi bi-person-circle"></i> Hesabım</RouterLink
              >
              <RouterLink
                to="/giris"
                class="dropdown-item"
                active-class="active"
                v-else
                ><i class="bi bi-person-circle"></i> Giriş Yap</RouterLink
              >
              <RouterLink
                to="/hesap/favoriler"
                class="dropdown-item"
                active-class="active"
                ><i class="bi bi-bookmark-heart"></i> Favoriler</RouterLink
              >
              <button class="dropdown-item" @click="logout">
                <i class="bi bi-box-arrow-right" ></i> Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useUserStore } from "../../stores/userStore";
export default {
  data() {
    return {
      user: useUserStore(),
    };
  },
  methods:{
    logout(){
      this.user.$patch({
        userID:null,
        email:null,
        firstname:null,
        lastname:null,
        likedBookmarks:[],
        userBookmarks:[]
      })
    }
  }
};
</script>
<style>
#account-menu-toggler {
  padding: 5px;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s;
}
#account-menu-toggler:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.dropdown-item.active {
  background-color: #4b4b4b !important;
}
</style>
