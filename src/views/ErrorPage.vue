<template>
  <HeaderVue />
  <div class="container pt-4 w-100 justify-content-center">
    <div class="row">
      <div class="col-10">
        <img src="../assets/Error.png" alt="" class="w-100" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderVue from "../components/Header/Header.vue";
export default {
  name: "ErrorPage",
  components: {
    HeaderVue,
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
    }
  },
};
</script>

<style></style>
