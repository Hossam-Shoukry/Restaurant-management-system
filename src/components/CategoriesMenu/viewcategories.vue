<template>
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="landing-page"></div>

    <div class="container" id="cont">
      <div class="row justify-content-between mt-5" style="padding-left: 13px">
        <div class="col-lg-3 col-md-5 col-12 text-center">
          <div
            @click="
              $router.push({
                name: 'addnewMenuCategory',
                params: { AddCategory: viewMyCategory },
              })
            "
            class="btn view-category"
          >
            Add category
            <font-awesome-icon
              class="food-icon"
              :icon="['fa', 'bowl-rice']"
              size="2xl"
            />
          </div>
        </div>
        <div class="col-lg-3 col-md-7 col-12 text-center mt-2">
          <router-link
            class="updateLocations"
            :to="{
              name: 'MenuPage',
              params: { menuLocationId: viewMyCategory },
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
      <div class="row justify-content-between categ-del">
        <div class="col-lg-10 col-md-10 text-start categ">
          <strong
            >{{ viewlistOfCategories.length }} - Categories In List</strong
          >
        </div>
        <div class="col-lg-2 col-md-2 col-md-2 del">
          <strong
            @click="
              $router.push({
                name: 'DeleteAllCategories',
                params: { CategoryMenu: viewMyCategory },
              })
            "
            class="btn btn-primary del-all view-category"
            >Delete All ?
            <font-awesome-icon
              class="food-icon"
              :icon="['fa', 'delete-left']"
              size="2xl"
            />
          </strong>
        </div>
      </div>

      <table class="table table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">number</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categList in viewlistOfCategories" :key="categList.id">
            <th scope="row">{{ categList.id }}</th>
            <td>{{ categList.name }}</td>
            <th class="action">
              <span
                @click="
                  $router.push({
                    name: 'updateCategory',
                    params: {
                      updateCateg: viewMyCategory,
                      MenuupdateCateg: categList.id,
                    },
                  })
                "
                >Update
                <font-awesome-icon :icon="['fa', 'pencil']" />
              </span>

              <span
                @click="
                  $router.push({
                    name: 'DeleteCategory',
                    params: {
                      deleteCateg: viewMyCategory,
                      MenuDeleteCateg: categList.id,
                    },
                  })
                "
                >Delete
                <font-awesome-icon :icon="['fa', 'trash-restore']" />
              </span>
              <span
                @click="
                  $router.push({
                    name: 'ItemsPage',
                    params: { ItemsMenu: viewMyCategory, Items: categList.id },
                  })
                "
                >Items
                <font-awesome-icon
                  class="food-icon"
                  :icon="['fa', 'bowl-rice']"
                  size="xl"
                />
              </span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
require("@/css/addCategory.css");
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
import { viewCategory } from "../Modules/Menue/viewCategory";

export default {
  setup() {
    const addCateg = addCategory();
    const MyMenue = menu();
    const viewCat = viewCategory();
    return { ...viewCat, ...MyMenue, ...addCateg };
  },
  name: "viewCategoriesComp",
  beforeMount() {
    this.viewMyCategory = this.$route.params.viewCategory;
    this.isLoggedInUser();
    this.canUserAccessThisLocation(
      this.loggedInUserId,
      this.viewMyCategory,
      "home"
    );
    this.viewUserCategories(this.loggedInUserId, this.viewMyCategory);
    setInterval(() => {
      this.randomImages();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped></style>
