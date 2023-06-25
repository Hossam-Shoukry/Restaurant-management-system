<template>
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="landing-page"></div>

    <div class="container">
      <h1 class="text-center pt-3">
        {{ "wellcome" + " " + userName }}
      </h1>

      <div class="text-center mt-5">
        <div
          @click="$router.push({ name: 'ProfilePage' })"
          class="btn btn-warning profile"
        >
          Show Profile
          <font-awesome-icon :icon="['fa', 'person']" />
        </div>
      </div>

      <div class="text-center add-restaurant">
        <div
          @click="$router.push({ name: 'AddLocation' })"
          class="btn btn-warning mt-2 location"
        >
          Add Location
          <font-awesome-icon :icon="['fa', 'location']" />
        </div>
      </div>
      <userLocationsVue />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import { addCategory } from "../Modules/Menue/addCategory";
import userLocationsVue from "../userLocations/userLocations.vue";
export default {
  name: "HomePage",
  setup() {
    const userName = ref("");
    const addCateg = addCategory();
    return { userName, ...addCateg };
  },
  components: {
    userLocationsVue,
  },

  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
    } else {
      this.userName = JSON.parse(user).name;
    }
    setInterval(() => {
      this.randomImages();
    }, 5000);
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang="scss" scoped>
@mixin buttons() {
  border-radius: 20px;
  border: none;
  color: white;
  background-color: rgba(128, 227, 240, 0.479);
  font-weight: bold;
  font-size: larger;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
    color: yellow;
  }
}
.body {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 1s;
  .location,
  .profile {
    @include buttons();
  }
  .landing-page {
    position: absolute;
    z-index: 1;
    opacity: 0.5;
    background-color: black;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .container {
    position: relative;
    z-index: 999;
  }
}
</style>
