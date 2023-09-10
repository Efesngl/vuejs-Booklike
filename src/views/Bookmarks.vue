<template>
  <div class="col-12 col-sm-9 p-2 d-flex justify-content-start flex-row align-content-start flex-wrap">
    <BookmarkCard v-for="i in bookmark" :bookmark="i">
      <template v-slot:buttonSection>
        <div class="col-12 d-flex justify-content-between">
          <a :href="i.url" class="link-dark"><i class="bookmark-item-button bi bi-globe"></i></a>
          <i
            class="bookmark-item-button bi bi-bookmark-plus"
            :class="{ liked: isFaved(i.ID), 'opacity-25': !this.user.isLogged, 'pe-none': !this.user.isLogged }"
            @click="Fav($event, i.ID)"
          ></i>
          <i class="bookmark-item-button bi bi-chat-square-text"></i>
        </div>
      </template>
    </BookmarkCard>
  </div>
</template>

<script>
import { useUserStore } from "../stores/userStore";
import BookmarkCard from "../components/BookmarkCard.vue";
import { computed, ref } from "vue";
export default {
  components: {
    BookmarkCard,
  },
  provide() {
    return {
      user: this.user,
    };
  },
  data() {
    return {
      user: useUserStore(),
      bookmark: [],
    };
  },
  created() {
    this.$watch(
      () => this.$route.params.cat,
      (newCat, oldCat) => {
        if (newCat != undefined) {
          this.getBookmarks();
        }
      }
    );
    this.getBookmarks();
  },
  methods: {
    getBookmarks() {
      this.$axios({
        method: "get",
        url: `/getbookmarks/${this.$route.params.cat}`,
      }).then((res) => {
        this.bookmark = res.data;
      });
    },
    isFaved(bId) {
      for (const fav of this.user.likedBookmarks) {
        if (bId == fav.bookmark_id) return true;
      }
      return false;
    },
    Fav(event, id) {
      let data = {
        user_id: this.user.userID,
        bookmark_id: id,
      };
      if (!event.target.classList.contains("liked")) {
        data.method = "0";
        this.$axios({
          method: "post",
          url: "/like",
          data: data,
        }).then((res) => {
          if (res.status == 201) {
            event.target.classList.add("liked");
            this.user.likedBookmarks.push({
              id: res.data.insertId,
              bookmark_id: id,
            });
            console.log(this.user.likedBookmarks);
          }
        });
      } else {
        data.method = "1";
        this.$axios({
          method: "delete",
          url: "/removelike",
          data: data,
        }).then((res) => {
          if (res.status == 200) {
            event.target.classList.remove("liked");
            let likedbms=this.user.likedBookmarks.filter(lb=>{
              return lb.bookmark_id!=id
            })
            console.log(likedbms);
            this.user.$patch({
              likedBookmarks:likedbms
            })
            console.log(this.user.likedBookmarks);
          }
        });
      }
    },
  },
};
</script>
<style></style>
