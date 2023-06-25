<template>
  <div class="bg-dark"><Header /></div>

  <HomeVue />
</template>

<script>
import Header from "@/components/Header/Header.vue";
import HomeVue from "@/components/Home/Home.vue";
export default {
  name: "HomeView",

  components: {
    Header,
    HomeVue,
  },
};
</script>
