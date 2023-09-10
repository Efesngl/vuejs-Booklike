<template>
  <div class="col-12 col-sm-9 p-2 d-flex justify-content-start flex-row align-content-start flex-wrap">
    <BookmarkCard v-for="i in bookmark" :bookmark="i">
      <template v-slot:buttonSection>
        <div class="col-12 d-flex justify-content-between">
          <a :href="i.url" class="link-dark"><i class="bookmark-item-button bi bi-globe"></i></a>
          <i class="bookmark-item-button bi bi-bookmark-plus liked" @click="removeFromFav($event, i.ID)"></i>
          <i class="bookmark-item-button bi bi-chat-square-text"></i>
        </div>
      </template>
    </BookmarkCard>
  </div>
</template>
<script>
import { useUserStore } from "../stores/userStore";
import BookmarkCard from "../components/BookmarkCard.vue";
export default {
  components: {
    BookmarkCard,
  },
  data() {
    return {
      user: useUserStore(),
      bookmark: {},
    };
  },
  created() {
    this.getFavBookmarks();
  },
  methods: {
    getFavBookmarks() {
      this.$axios({
        method: "get",
        url: `/getfavbookmarks/${this.user.userID}`,
      }).then((res) => {
        this.bookmark = res.data;
      });
    },
    removeFromFav(event, id) {
      console.log(event);
      console.log(id);
      this.$axios({
        method: "delete",
        url: `/removelike`,
        data: {
          user_id: this.user.userID,
          bookmark_id: id,
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.bookmark = this.bookmark.filter((b) => {
            return id != b.ID;
          });
          let likedbms=this.user.likedBookmarks.filter(b=>{
            return b.bookmark_id!=id
          })
          this.user.$patch({
            likedBookmarks:likedbms
          })
        }
      });
    },
  },
};
</script>
