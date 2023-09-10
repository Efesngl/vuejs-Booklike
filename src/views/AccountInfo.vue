<template>
  <div class="account-info col-sm-9 col-12 d-flex justify-content-center pt-3 align-items-start">
    <div class="card w-auto p-3 h-auto">
      <div class="card-title">
        <h3>Hesap bilgileri</h3>
      </div>
      <div class="form-area text-start">
        <label for="firstname">Ad</label>
        <input type="text" v-model="info.firstname" class="form-control" name="firstname" id="firstname" placeholder="Ad" />
        <label for="lastname" class="mt-3">Soyad</label>
        <input type="text" v-model="info.lastname" class="form-control" name="lastname" id="lastname" placeholder="Soyad" />
        <label for="email" class="mt-3">Eposta</label>
        <input type="text" v-model="info.email" class="form-control" name="email" id="email" placeholder="Eposta" />
        <label for="email" class="mt-3">Şifre</label>
        <input type="password" v-model="info.password" class="form-control" name="pass" id="pass" placeholder="Şifre" />
        <div class="d-flex flex-column align-items-center">
          <button class="btn mt-3 btn-secondary w-100" @click="updateAccInfo()">Kaydet</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "crypto-js/md5";
import { useUserStore } from "../stores/userStore";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      user: useUserStore(),
      info: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.info.firstname = this.user.firstname;
    this.info.lastname = this.user.lastname;
    this.info.email = this.user.email;
  },
  methods: {
    updateAccInfo() {
      const accInfo = {
        userData: {
          firstname: this.info.firstname,
          lastname: this.info.lastname,
          email: this.info.email,
        },
        ID: this.user.userID,
      };
      if (this.info.password != "") {
        accInfo.userData.password = md5(this.info.password).toString();
      }
      this.$axios({
        method: "patch",
        url: `/updateuser`,
        data: accInfo,
      }).then((res) => {
        if (res.status == 200) {
          Swal.fire({
            toast: true,
            position: "top-right",
            iconColor: "white",
            icon: "success",
            color: "white",
            background: "#2ecc71",
            timer: 1500,
            timerProgressBar: true,
            title: "Güncelleme işlemi başarılı !",
            showConfirmButton: false,
          }).then(() => {
            this.user.$patch({
              firstname: this.info.firstname,
              lastname: this.info.lastname,
              email: this.info.email,
            });
            this.info.password = "";
          });
        }
      });
    },
  },
};
</script>
