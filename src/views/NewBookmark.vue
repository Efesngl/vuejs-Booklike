<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-3">
        <div class="card p-3">
          <div class="card-title text-center">
            <h3>Yeni favori ekle</h3>
          </div>
          <div class="form-area">
            <label for="title">Başlık</label>
            <input type="text" v-model="bookmark.title" class="form-control" name="title" id="title" placeholder="Başlık" />
            <label for="URL" class="mt-3">URL</label>
            <input type="text" v-model="bookmark.url" class="form-control" name="URL" id="URL" placeholder="URL" />
            <label for="cat" class="mt-3">Kategori</label>
            <select v-model="bookmark.category" name="cat" id="cat" class="form-select">
              <option :value="cat.ID" v-for="cat in categories">{{ cat.category }}</option>
            </select>
            <label for="desc" class="mt-3">Açıklama</label>
            <textarea type="text" class="form-control" v-model="bookmark.description" name="desc" id="desc" placeholder="Açıklama"></textarea>
            <div class="d-flex flex-column align-items-center">
              <button class="btn mt-3 btn-secondary w-100" @click="addNewBookmark">Ekle</button>
              <RouterLink class="btn mt-3 btn-danger w-100" to="/">İptal</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { useUserStore } from "../stores/userStore";
export default {
  data() {
    return {
      user: useUserStore(),
      bookmark: {
        title: null,
        url: null,
        description: null,
        category: null,
        creator: useUserStore().userID,
      },
      categories: {},
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/getcategories",
    }).then((res) => {
      this.categories = res.data;
    });
  },
  methods: {
    addNewBookmark() {
      this.$axios({
        method: "post",
        url: "/addbookmark",
        data: this.bookmark,
      }).then((res) => {
        if (res.status == 201) {
          this.bookmark = {
            title: null,
            url: null,
            description: null,
            category: null,
            creator: useUserStore().userID,
          };
          Swal.fire({
            toast: true,
            position: "top-right",
            iconColor: "white",
            icon: "success",
            color: "white",
            background: "#2ecc71",
            timer: 1500,
            timerProgressBar: true,
            title: "Ekleme işlemi başarılı !",
            showConfirmButton: false,
          });
        }
      });
    },
  },
};
</script>
