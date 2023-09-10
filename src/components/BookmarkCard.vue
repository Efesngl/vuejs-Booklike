<template>
  <div class="card bookmark-item text-center me-2 mb-5">
    <div class="card-body pb-0">
      <div class="card-title text-center fs-6">{{ bookmark.title }} {{ bookmark.ID }}</div>
      <div class="row bookmark-buttons mb-2">
        <slot name="buttonSection"> </slot>
      </div>
      <div class="row bookmark-info">
        <div class="col-12 d-flex p-0 justify-content-evenly">
          <a href="#" class="text-decoration-none text-secondary bookmark-owner-link"
            ><span class="creator"
              >{{ bookmark.firstname }} <br />
              {{ bookmark.lastname }}</span
            ></a
          >
          <span class="created-at mb-3"
            >{{ new Date(bookmark.created_at).getDate() }}<br />{{ months[new Date(bookmark.created_at).getMonth()] }} <br />
            {{ new Date(bookmark.created_at).getFullYear() }}</span
          >
        </div>
      </div>
    </div>
    <div class="card-footer text-bg-danger">{{ bookmark.category }}</div>
  </div>
</template>
<script>
export default {
  props: ["bookmark"],
  data() {
    return {
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    };
  },
};
</script>

<style>
.bookmark-item-button {
  transition: 0.2s;
  font-size: 2rem !important;
}
.bookmark-item-button:hover {
  opacity: 0.8;
  cursor: pointer;
}
.liked {
  color: #ff4d4d;
}
.card.bookmark-item {
  width: 10rem;
  height: 12rem;
}
.bookmark-info {
  font-size: 0.9rem;
  line-height: 1rem;
  word-wrap: break-word;
}
.bookmark-owner-link .creator {
  transition: 0.2s;
}
.bookmark-owner-link:hover .creator {
  color: #ff4d4d;
}
</style>
