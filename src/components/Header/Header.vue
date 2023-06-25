<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark header">
    <!--next link is for logo company-->
    <a
      @click.prevent=""
      href=""
      id="brand"
      class="navbar-brand"
      style="padding-left: 30px"
      >{{ name + " " + "Page" }}</a
    >
    <a href="#links" class="navbar-toggler" data-toggle="collapse">
      <span class="navbar-toggler-icon"></span>
    </a>
    <div class="justify-content-center collapse navbar-collapse" id="links">
      <ul class="navbar-nav" style="padding-left: 30px">
        <li class="nav-item">
          <router-link class="nav-link home" to="/" exact
            >Home
            <font-awesome-icon :icon="['fass', 'house-chimney']" />
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link logout" @click="logMeOut()" style="cursor: pointer"
            >LogOut
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
    };
  },
  name: "HeaderPage",
  methods: {
    ...mapActions(["redirectTo"]),
    logMeOut() {
      localStorage.clear();
      this.redirectTo({ val: "LoginPage" });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
    }
  },
};
</script>

<style lang="scss">
.header {
  .home,
  .logout {
    font-weight: 500;
    font-size: large;
    transition: 0.6s;
    &:hover {
      color: orange;
      transform: scale(1.1);
    }
  }
}
@media (max-width: 280px) {
  .navbar {
    &a {
      font-size: 15px;
    }
  }
}
@media (max-width: 280px), (max-width: 308px) {
  #brand {
    font-size: 15px;
  }
}
@media (max-width: 250px) {
  #brand {
    font-size: 12px;
  }
}
</style>
