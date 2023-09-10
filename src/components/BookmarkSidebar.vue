<template>
  <div class="col-3 d-none d-sm-inline-block p-0 border-end overflow-x-hidden">
    <div class="side-bar">
      <div class="list-group list-group-flush fs-5">
        <RouterLink to="/bookmarks/frontend" class="list-group-item list-group-item-action" active-class="active">
          <i class="bi bi-command"></i> Front-end
        </RouterLink>
        <RouterLink to="/bookmarks/backend" class="list-group-item list-group-item-action" active-class="active">
          <i class="bi bi-command"></i> Back-end
        </RouterLink>
        <RouterLink to="/bookmarks/web" class="list-group-item list-group-item-action" active-class="active">
          <i class="bi bi-command"></i> Web
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterView } from 'vue-router';

    export default{
    components: { RouterView }
}
</script>