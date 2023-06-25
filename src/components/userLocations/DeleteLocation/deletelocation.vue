<template>
  <Header />
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="overlay"></div>
    <div class="container">
      <form action="" @click.prevent>
        <div class="row g-3 align-items-center">
          <div class="col-auto mx-auto d-block">
            <h1>Delete Restaurant</h1>
            <p>Are You Sure You Want To Delete This Location?</p>
            <div class="list-group mb-3 text-center">
              <span class="list-group-item bg-dark text-white">{{ name }}</span>
              <span class="list-group-item bg-dark text-white">{{
                adress
              }}</span>
              <span class="list-group-item bg-dark text-white">{{
                phone
              }}</span>
            </div>
            <div v-if="isdeleted" class="text-center text-danger">
              <span>{{ isdeleted }}</span>
            </div>
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-12 text-center mx-auto d-block">
            <div @click="redirectTo({ val: 'home' })" class="btn btn-back">
              Go Back
            </div>
          </div>
          <div class="col-12 text-center">
            <div class="btn btn-del" @click="DeleteingLocationData()">
              Delete Now
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { addCategory } from "@/components/Modules/Menue/addCategory";
import { mapActions } from "vuex";
import Header from "../../Header/Header.vue";
import { DeleteLocation } from "../../Modules/DeleteLocations/DeleteDataLocation";
export default {
  setup() {
    const Delete = DeleteLocation();
    const addCateg = addCategory();
    return { ...addCateg, ...Delete };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.restrauntLocation = this.$route.params.locationId;
      this.userId = JSON.parse(user).id;
      console.log(this.userId);
    } else {
      this.redirectTo({ val: "SignUp" });
    }
    this.getLocationDataToDelete();
    this.randomImages();
  },
  name: "DeleteLocation",
  components: {
    Header,
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang="scss" scoped>
.body {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 0.3s;
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: black;
    opacity: 0.3;
  }
  .container {
    display: flex;
    position: relative;
    z-index: 2;
    justify-content: center;
    form {
      h1 {
        text-align: center;
        margin-top: 50px;
        text-shadow: 6px 5px 5px rgb(0, 0, 161);
      }
      p {
        color: rgb(194, 202, 157);
        font-size: 20px;
        text-align: center;
        margin-top: 70px;
        font-weight: bold;
        text-shadow: 6px 5px 5px rgb(12, 131, 52);
      }
    }
    .btn-back,
    .btn-del {
      border-radius: 10px;
      font-weight: bold;
      transition: 0.5s;
      &:hover {
        color: orangered;
        scale: 1.1;
      }
    }
    .btn-back {
      color: white;
      background-color: rgba(4, 4, 34, 0.966);
    }
    .btn-del {
      color: white;
      background-color: rgba(4, 4, 34, 0.966);
    }
  }
}
@media (max-width: 385px) {
  .btn-del {
    font-size: 13px;
    font-weight: bold;
  }
}
</style>
