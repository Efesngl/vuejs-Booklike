<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-3">
        <div class="card p-3">
          <div class="card-title text-center">
            <h3>Kayıt ol</h3>
          </div>
          <div class="form-area">
            <label for="firstname">Ad</label>
            <input type="text" class="form-control" v-model="user.firstname" name="firstname" id="firstname" placeholder="Ad" />
            <span class="text-danger text-sm d-block" v-if="registerError.firstname">*Bu alanı doldurmak zorunludur !</span>
            <label for="firstname" class="mt-3">Soyad</label>
            <input type="text" class="form-control" v-model="user.lastname" name="lastname" id="lastname" placeholder="Soyad" />
            <span class="text-danger text-sm d-block" v-if="registerError.lastname">*Bu alanı doldurmak zorunludur !</span>
            <label for="email" class="mt-3">Eposta</label>
            <input type="text" class="form-control" name="email" v-model="user.email" id="email" placeholder="Eposta" />
            <span class="text-danger text-sm d-block" v-if="registerError.email">*Bu alanı doldurmak zorunludur !</span>
            <label for="email" class="mt-3">Şifre</label>
            <input type="password" class="form-control" name="pass" v-model="user.password" id="pass" placeholder="Şifre" />
            <span class="text-danger text-sm d-block" v-if="registerError.password">*Bu alanı doldurmak zorunludur !</span>
            <div class="d-flex flex-column align-items-center">
              <button class="btn mt-3 btn-secondary w-100" @click="register">Kayıt ol</button>
              <span class="mt-2">Zaten hesabınız var mı ? <RouterLink class="text-decoration-none" to="/giris">Hemen giriş yapın !</RouterLink></span>
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
  data() {
    return {
      userStore: useUserStore(),
      user: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        hashedPassword: null,
      },
      registerError: {
        firstname: false,
        lastname: false,
        email: false,
        password: false,
      },
    };
  },
  methods: {
    register() {
      if (!this.hasError()) {
        this.user.hashedPassword = md5(this.user.password).toString();
        this.$axios({
          method: "post",
          url: "/register",
          data: this.user,
        }).then((res) => {
          console.log(res);
          if (res.status == 201 && res.data.error == undefined) {
            this.userStore.$patch({ 
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              email: this.user.email,
              userID: res.data.ID,
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
              title: "Kayıt işlemi başarılı !",
              text: "Yönlendiriliyorsunuz...",
              showConfirmButton: false,
            }).then(() => {
              this.$router.replace("/");
            });
          } else {
            Swal.fire({
              toast: true,
              position: "top-right",
              iconColor: "white",
              icon: "error",
              color: "white",
              background: "#e74c3c",
              timer: 1500,
              timerProgressBar: true,
              title: "Bu epostaya sahip bir kullanıcı zaten mevcut !",
              showConfirmButton: false,
            });
          }
        });
      }
    },
    hasError() {
      Object.keys(this.registerError).forEach((e) => {
        this.registerError[e] = false;
      });
      let hasError = false;
      Object.keys(this.user).forEach((u) => {
        if (u != "hashedPassword") {
          if (this.user[u] == null || this.user[u] == "") {
            this.registerError[u] = true;
            if (!hasError) hasError = true;
          }
        }
      });
      if (hasError) return true;
      return false;
    },
  },
};
</script>
