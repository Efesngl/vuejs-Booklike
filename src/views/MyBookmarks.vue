<template>
  <div class="col-12 col-sm-9 p-2 d-flex justify-content-start flex-row align-content-start flex-wrap">
    <BookmarkCard v-for="i in bookmarks" :bookmark="i" :cat="i.category" :type="true">
      <template v-slot:buttonSection>
        <div class="col-12 d-flex justify-content-evenly">
          <i @click="deleteBookmark(i.ID)" class="bookmark-item-button bi bi-trash"> </i>
          <RouterLink class="link-dark bookmark-item-button" :to="{ name: 'EditBookmarkPage', params: { id: i.ID } }"
            ><i class="bookmark-item-button bi bi-pencil"></i
          ></RouterLink>
        </div>
      </template>
    </BookmarkCard>
  </div>
</template>
<script>
import { useUserStore } from "../stores/userStore";
import BookmarkCard from "../components/BookmarkCard.vue";
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
export default {
  components: {
    BookmarkCard,
    RouterLink,
  },
  data() {
    return {
      user: useUserStore(),
      bookmarks: [],
    };
  },
  created() {
    if (this.bookmarks.length == 0) {
      this.getUserBookmarks();
    }
  },
  methods: {
    getUserBookmarks() {
      this.$axios({
        method: "get",
        url: `/userbookmarks/${this.user.userID}`,
      }).then((res) => {
        this.bookmarks = res.data;
        console.log(this.bookmarks);
      });
    },
    deleteBookmark(id) {
      Swal.fire({
        icon: "warning",
        title: "Dikkat bu işlem geri alınamyacaktır !",
        text: "Bu bookmarkı silmek istiyor musunuz ?",
        showDenyButton: true,
        denyButtonText: "Hayır",
        confirmButtonText: "Evet",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$axios({
            method: "delete",
            url: `/deletebookmark/${id}`,
          }).then((res) => {
            if (res.data.affectedRows > 0) {
              Swal.fire({
                icon: "success",
                title: "Silme İşlemi başarılı",
                confirmButtonText: "Tamam",
              });
              this.bookmarks = this.bookmarks.filter((b) => {
                return b.ID != id;
              });
            }
          });
        }
      });
    },
  },
};
</script>
