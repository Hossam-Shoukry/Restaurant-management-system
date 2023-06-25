<template>
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
          <div
            @click="
              $router.push({
                name: 'viewCategories',
                params: { viewCategory: MyLocationId },
              })
            "
            class="btn btn-outline-danger view-category"
          >
            View Category
            <font-awesome-icon
              class="food-icon"
              :icon="['fa', 'bowl-rice']"
              size="2xl"
            />
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-12 col-12 text-center">
          <div
            @click="
              $router.push({
                name: 'MenuPage',
                params: { menuLocationId: MyLocationId },
              })
            "
            class="btn btn-secondary menu"
          >
            Go To Menu
            <font-awesome-icon
              class="menu-icon"
              :icon="['fa', 'list-squares']"
              size="2xl"
            />
          </div>
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <div class="col-5">
          <h1 class="text-center">
            {{ locationName }}
            <p class="mt-5" style="color: cadetblue">{{ locationAdress }}</p>
          </h1>
        </div>
      </div>
      <form action="" @click.prevent>
        <h1 class="text-center" style="color: steelblue">Add new category</h1>
        <div class="row justify-content-center">
          <div class="col-8">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="add-category"
                v-model.lazy.trim="name"
              />
              <div v-if="v$.name.$error" class="text-danger text-center mt-3">
                {{ v$.name.$errors[0].$message }}
              </div>
              <div class="text-center text-white" v-if="successMessage">
                {{ successMessage }}
              </div>
              <div class="alert text-white" v-if="errorrMessage">
                {{ errorrMessage }}
              </div>
            </div>
          </div>
          <div class="col-6 text-center mt-5">
            <button
              @click.="addMyCateg"
              type="submit"
              class="btn btn-primary submit"
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
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
export default {
  setup() {
    const MyMenue = menu();
    const addCateg = addCategory();
    return { ...addCateg, ...MyMenue };
  },
  name: "AddmenuCateg",
  beforeMount() {
    this.userInfo();
    this.MyLocationId = this.$route.params.AddCategory;
    this.isLoggedInUser();
    this.canUserAccessThisLocation(
      this.loggedInUserId,
      this.MyLocationId,
      "home"
    );
    this.displayUserCategories(this.loggedInUserId, this.MyLocationId);
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
@media (max-width: 240px) {
  .body {
    .container {
      h1 {
        font-size: 17px;
      }
      form {
        position: relative;
        left: 5px;
      }
    }
  }
}
</style>
