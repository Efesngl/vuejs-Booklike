<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-3">
        <div class="card p-3">
          <div class="card-title text-center">
            <h3>Bookmark düzenle</h3>
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
              <button class="btn mt-3 btn-secondary w-100" @click="editBookmark">Kaydet</button>
              <button class="btn mt-3 btn-danger w-100" @click="redirect">İptal</button>
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
        ID:this.$route.params.id,
        title: null,
        url: null,
        description: null,
        category: null,
      },
      categories: {},
    };
  },
  created() {
    this.getBookmark();
  },
  methods: {
    editBookmark() {
      console.log(this.bookmark);
      this.$axios({
        method: "patch",
        url: `/editbookmark/${this.$route.params.id}`,
        data: this.bookmark,
      }).then((res) => {
        console.log(res);
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
          });
        }
      });
    },
    getBookmark() {
      this.$axios({
        method: "get",
        url: `/getbookmark/${this.$route.params.id}`,
      }).then((res) => {
        this.bookmark.category = res.data.category;
        this.bookmark.description = res.data.description;
        this.bookmark.title = res.data.title;
        this.bookmark.url = res.data.url;
      });
      this.$axios({
        method:"get",
        url:"/getcategories"
      }).then(res=>{
        this.categories=res.data
      })
    },
    redirect() {
      if (this.$route.redirectedFrom != undefined) {
        this.$router.push({ name: this.$route.redirectedFrom.name });
      } else {
        if (window.history.state.back != null) {
          this.$router.back();
        } else {
          this.$router.push({ name: "AccountInfoPage" });
        }
      }
    },
  },
};
</script>
