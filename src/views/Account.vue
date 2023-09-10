<template>
  <Navbar></Navbar>
  <Sidebar>
      <template v-slot:listGroup>
          <AccountSidebar></AccountSidebar>
      </template>
      <template v-slot:content>
        <RouterView></RouterView>
      </template>
  </Sidebar>

</template>
<script>
import { useUserStore } from '../stores/userStore';
import Sidebar from '../components/Sidebar.vue';
import AccountSidebar from '../components/AccountSidebar.vue';
export default {
  components:{
    Sidebar,
    AccountSidebar,
  },
  created(){
    this.user.$subscribe((mut,state)=>{
      if(!this.user.isLogged){
        this.$router.push({name:"LoginPage"})
      }
    })
  },
  mounted(){
    console.log(this.$router)
    console.log(this.$route)
  },
  data(){
    return {
      user:useUserStore()
    }
  }
};
</script>
