<template>
  <HeaderVue />
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="landing-page"></div>
    <div class="container">
      <div class="row justify-content-between mt-5">
        <div class="col-lg-12 col-12 text-center">
          <router-link
            :to="{
              name: 'ItemsPage',
              params: { ItemsMenu: moveById, Items: deletebyId },
            }"
          >
            <div class="btn view-items">View Items</div>
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
      <div class="text-center mb-3 add-text">
        update Item <span class="text-danger">{{ updateItemName }}</span> For
        Category #<span class="text-danger">{{ categName }}</span>
      </div>
      <form action="" @click.prevent>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="meal-name"
            v-model.trim.lazy="mealName"
          />
          <div class="text-danger text-center" v-if="v$.mealName.$error">
            {{ v$.mealName.$errors[0].$message }}
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="text-center size">Size :{{ mealSize }}</div>
          <select
            class="w-100 mt-3 form-control"
            @change="deterMainPrice()"
            v-model="mealSize"
            style="height: 35px"
          >
            <option disabled value="">Please select one</option>
            <option>Large</option>
            <option>Medium</option>
            <option>Small</option>
          </select>
          <div class="text-danger text-center" v-if="v$.mealSize.$error">
            {{ v$.mealSize.$errors[0].$message }}
          </div>
        </div>
        <div class="text-center mt-3 price">price : {{ price }}</div>
        <div class="text-danger text-center success" v-if="ItemsuccessMessage">
          {{ ItemsuccessMessage }}
        </div>
        <div class="form-group text-center mt-3">
          <input
            @click="UpdateItem()"
            class="btn add-item"
            type="submit"
            value="Update-Item"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import HeaderVue from "../Header/Header.vue";
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
import { addNewItem } from "../Modules/Menue/addNewItem";
import { viewCategory } from "../Modules/Menue/viewCategory";
export default {
  setup() {
    const view = viewCategory();
    const add = addNewItem();
    const MyMenue = menu();
    const addMyCateg = addCategory();
    return { ...addMyCateg, ...MyMenue, ...add, ...view };
  },
  name: "updateItemComp",
  components: {
    HeaderVue,
  },
  beforeMount() {
    this.moveById = this.$route.params.updateItemsMenu;
    this.deletebyId = this.$route.params.updateItems;
    this.updateItembyId = this.$route.params.updateItemId;
    this.userInfo();
    this.canUserAccessThisLocation(this.userId, this.moveById, "home");
    this.displayUserCategories(this.userId, this.moveById);
    this.diplayItemCategory();
    this.getAllItems();
    this.getOneItemToUpdate();
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
  min-height: calc(100% + 100px);
  background-size: cover;
  transition: 1s;
  input,
  select {
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
  .price,
  .size {
    color: whitesmoke;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 5px 5px 5px rgb(19, 224, 88);
  }
  .add-text {
    color: whitesmoke;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 5px 5px 5px rgb(19, 224, 88);
    span {
      font-size: 20px;
      margin-left: 10px;
    }
  }
  .view-items,
  .add-item {
    border-radius: 20px;
    background-color: rgb(187, 144, 25);
    transition: 0.6s;
    color: white;
    &:hover {
      color: red;
      scale: 1.1;
      font-weight: bold;
    }
  }
}
</style>
