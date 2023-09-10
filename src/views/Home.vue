<template>
    <Navbar></Navbar>
    <Sidebar>
        <template v-slot:listGroup>
            <BookmarkSidebar></BookmarkSidebar>
        </template>
        <template v-slot:content>
            <RouterView></RouterView>
        </template>
    </Sidebar>
</template>
<script>
    import BookmarkSidebar from '../components/BookmarkSidebar.vue';
    import Sidebar from '../components/Sidebar.vue';
    export default{
        components:{
            Sidebar,
            BookmarkSidebar,
        },
    }
</script>