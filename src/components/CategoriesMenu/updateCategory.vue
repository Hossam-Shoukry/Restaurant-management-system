<template>
  <HeaderVue />
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="landing-page"></div>
    <div class="container" id="cont">
      <div class="row justify-content-between mt-5" style="padding-left: 20px">
        <div class="col-lg-3 col-md-4 col-sm-12 col-12 text-center">
          <router-link
            :to="{
              name: 'viewCategories',
              params: { viewCategory: id1 },
            }"
          >
            <div class="btn view-category">
              View Category
              <font-awesome-icon
                class="food-icon"
                :icon="['fa', 'bowl-rice']"
                size="2xl"
              />
            </div>
          </router-link>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-12 col-12 text-center">
          <router-link
            :to="{
              name: 'MenuPage',
              params: { menuLocationId: id1 },
            }"
          >
            <div class="btn menu">
              Go To Menu
              <font-awesome-icon
                class="menu-icon"
                :icon="['fa', 'list-squares']"
                size="2xl"
              />
            </div>
          </router-link>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center">
            {{ locationName }}
            <p class="text-muted">{{ locationAdress }}</p>
          </h1>
        </div>
      </div>
      <!----------------------------------------------------------->
      <form action="" @click.prevent>
        <h1 class="text-center" style="color: steelblue">
          Update Category #
          <span class="text-danger">{{ displayCategName }}</span> # number
          <span class="text-danger">{{ categNum }}</span>
        </h1>
        <div class="row justify-content-center">
          <div class="col-8">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="add-category"
                v-model="catgName"
              />
              <div class="text-center" v-if="v$.catgName.$error">
                {{ v$.catgName.$errors[0].$message }}
              </div>
              <div class="text-center text-danger mt-1" v-if="successmessage">
                {{ successmessage }}
              </div>
            </div>
          </div>
          <div class="col-6 text-center mt-3">
            <button
              @click="updateUserCategory(id1)"
              type="submit"
              class="btn submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { updateCategory } from "@/components/Modules/Menue/updateCategory";
import HeaderVue from "../Header/Header.vue";
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
//import { addCategory } from "../Modules/Menue/addCategory";
export default {
  setup() {
    // const addCateg = addCategory();
    const MyMenue = menu();
    const addCateg = addCategory();
    const update = updateCategory();
    return { ...addCateg, ...update, ...MyMenue /* ...addCateg */ };
  },
  name: "updateCateoryComp",
  components: {
    HeaderVue,
  },
  beforeMount() {
    this.id1 = this.$route.params.updateCateg;
    this.deleteById = this.$route.params.MenuupdateCateg;
    console.log(this.deleteById);
    this.updateInfo();
    this.canUserAccessThisLocation(this.userId, this.id1, "home");
    this.displayCategoryName();
    this.getAllCategories();
    setInterval(() => {
      this.randomImages();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped>
.body {
  transition: 1s;
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  input {
    border-radius: 20px;
    &:focus {
      &::-webkit-input-placeholder {
        opacity: 0;
        transition: 0.5s;
      }
    }
  }
  .container {
    position: relative;
    z-index: 2;
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
  .view-category,
  .menu {
    border-radius: 20px;
    border: none;
    color: white;
    background-color: rgba(128, 227, 240, 0.479);
    font-weight: bold;
    transition: 0.5s;
    &:hover {
      transform: scale(1.1);
      color: yellow;
    }
  }
  .submit {
    width: 140px;
    border-radius: 20px;
    border: none;
    color: white;
    background-color: rgba(128, 227, 240, 0.479);
    font-weight: bold;
    transition: 0.5s;
    &:hover {
      transform: scale(1.1);
      color: yellow;
    }
  }
  @media (max-width: 1199px) {
    .menu {
      position: relative;
      width: 157px;
      right: 50px;
    }
  }
}

@media (max-width: 767px) {
  .body {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background-size: cover;
    h1 {
      text-shadow: 5px 5px 5px blue;
      font-size: 25px;
      color: white;
      -webkit-text-stroke: 0.5px orangered;
      -webkit-text-fill-color: gray;
    }
    #cont {
      z-index: 999;
      position: relative;
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
    .food-icon,
    .menu-icon {
      color: inherit;
      margin-left: 5px;
    }
    .view-category,
    .menu {
      border-radius: 20px;
      border: none;
      color: white;
      background-color: rgba(128, 227, 240, 0.479);
      font-weight: bold;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
        color: yellow;
      }
    }
    .menu {
      position: relative;
      right: 80px;
      top: 10px;
      width: 190px;
    }
  }
  @media (max-width: 767px) {
    .menu {
      width: 170px;
      left: 1px;
    }
    .view-category,
    .menu {
      font-size: 15px;
      width: 200px;
    }
    h1 {
      font-size: 30px;
    }
  }
  @media (max-width: 475px) {
    .body {
      .container {
        h1 {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width: 384px) {
    .body {
      .menu {
        width: 170px;
      }
      .view-category,
      .menu {
        font-size: 13px;
        width: 157px;
      }
      h1 {
        font-size: 30px;
      }
    }
  }

  @media (max-width: 420px) {
    h1 {
      font-size: 20px;
    }
  }
  @media (max-width: 384px) {
    .view-category,
    .menu {
      font-size: 10px;
    }
    button {
      font-size: 12px;
      border-radius: 20px;
      padding: 10px;
      width: 80px;
      font-weight: bolder;
    }
  }
}
@media (max-width: 315px) {
  .body {
    height: 600px;
    .submit {
      width: 100px;
    }
  }
}
</style>
