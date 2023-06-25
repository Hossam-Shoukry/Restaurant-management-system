<template>
  <HeaderVue />
  <Profile />
</template>

<script>
import HeaderVue from "@/components/Header/Header.vue";
import Profile from "@/components/Profile/profile.vue";
export default {
  name: "ProfilePage",
  components: {
    Profile,
    HeaderVue,
  },
};
</script>

<style></style>
