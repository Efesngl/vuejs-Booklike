<template>
  <div class="col-3 d-none d-sm-inline-block p-0 border-end overflow-x-hidden">
    <div class="side-bar">
      <div class="list-group list-group-flush fs-5">
        <RouterLink class="list-group-item list-group-item-action" active-class="active" to="/hesap/bookmarklarim"><i class="bi bi-journal-bookmark-fill"></i> Bookmarklarım</RouterLink>
        <RouterLink class="list-group-item list-group-item-action" to="/hesap/favoriler" active-class="active"
          ><i class="bi bi-bookmarks"></i> Favoriler</RouterLink
        >
        <RouterLink class="list-group-item list-group-item-action" to="/hesap/hesapbilgileri" active-class="active"
          ><i class="bi bi-person-circle"></i> Hesabım</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
