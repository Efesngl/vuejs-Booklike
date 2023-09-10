<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-3">
        <div class="card p-3 login">
          <div class="card-title text-center">
            <h3>Giriş Yap</h3>
          </div>
          <div class="form-area">
            <label for="email">Eposta</label>
            <input type="text" class="form-control" name="email" v-model="userLogin.email" id="email" placeholder="Eposta" />
            <span v-if="loginError.email" class="text-danger text-sm d-block">*Bu alan boş bırakılamaz</span>
            <label for="email" class="mt-3">Şifre</label>
            <input type="password" class="form-control" @keyup.enter="login" name="pass" v-model="userLogin.password" id="pass" placeholder="Şifre" />
            <span v-if="loginError.password" class="text-danger text-sm d-block">*Bu alan boş bırakılamaz</span>
            <div class="d-flex flex-column align-items-center">
              <button class="btn mt-3 btn-secondary w-100" @click="login">Giriş</button>
              <span class="mt-2">Üye değil misiniz ? <RouterLink to="/kayit" class="text-decoration-none">Hemen kayıt olun !</RouterLink></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "crypto-js/md5";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/userStore";
export default {
  mounted() {
    console.log(this.$route);
    console.log(this.$router);
  },
  data() {
    return {
      user: useUserStore(),
      userLogin: {
        email: null,
        password: null,
      },
      loginError:{
        email:false,
        password:false
      }
    };
  },
  methods: {
    login() {
      this.loginError.email=false
      this.loginError.password=false
      if ((this.userLogin.email != null && this.userLogin.email!="") && (this.userLogin.password != null && this.userLogin.password != "")) {
        this.$axios({
          method: "get",
          url: `/login?email=${this.userLogin.email}&password=${md5(this.userLogin.password).toString()}`,
        }).then((res) => {
          if (res.status == 200 && res.data.error==undefined) {
            this.user.$patch({
              firstname: res.data.user.firstname,
              lastname: res.data.user.lastname,
              email: res.data.user.email,
              userID: res.data.user.ID,
              likedBookmarks:res.data.likedBookmarks,
              userBookmarks:res.data.userBookmarks
            });
            Swal.fire({
              toast: true,
              position: "top-right",
              iconColor: "white",
              icon: "success",
              color: "white",
              background: "#2ecc71",
              timer: 1500,
              timerProgressBar: true,
              title: "Giriş işlemi başarılı !",
              text: "Yönlendiriliyorsunuz...",
              showConfirmButton: false,
            }).then(() => {
              if (this.$route.redirectedFrom != undefined) {
                this.$router.push({ name: this.$route.redirectedFrom.name });
              } else {
                if (window.history.state.back != null) {
                  this.$router.back();
                } else {
                  this.$router.push({ name: "AccountInfoPage" });
                }
              }
            });
          }else{
            Swal.fire({
              toast: true,
              position: "top-right",
              iconColor: "white",
              icon: "error",
              color: "white",
              background: "#e74c3c",
              timer: 1500,
              timerProgressBar: true,
              title: "Kullanıcı adı veya şifre hatalı !",
              showConfirmButton: false,
            })
          }
        });
      }else{
        if(this.userLogin.email==null || this.userLogin.email==""){
          this.loginError.email=true
        }
        if(this.userLogin.password==null || this.userLogin.password==""){
          this.loginError.password=true
        }
      }

    },
  },
};
</script>
