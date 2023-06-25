<template>
  <Header />
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="landing-page"></div>
    <div class="container" id="cont">
      <div class="row justify-content-between mt-5">
        <div class="col-lg-3 col-md-4 col-sm-12 col-12 text-center">
          <div
            @click="
              $router.push({
                name: 'viewCategories',
                params: { viewCategory: moveById },
              })
            "
            class="btn view-category"
          >
            View Categories
            <font-awesome-icon
              class="food-icon"
              :icon="['fa', 'bowl-rice']"
              size="2xl"
            />
          </div>
        </div>
        <div
          class="col-lg-2 col-md-3 col-sm-12 col-12 text-center"
          style="padding-left: 30px"
        >
          <div
            @click="
              $router.push({
                name: 'addItemsPage',
                params: { addItemsMenu: moveById, addItems: deletebyId },
              })
            "
            class="btn menu"
          >
            Add Items
            <font-awesome-icon class="menu-icon" :icon="['fa', 'pencil']" />
          </div>
        </div>
      </div>
      <!--display user location-->
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center">
            {{ locationName }}
            <p class="text-muted">{{ locationAdress }}</p>
          </h1>
        </div>
      </div>
      <!---------------------------->
      <div class="row mt-5 justify-content-center">
        <div class="col-xl-6 col-md-8 col-12 itemsNum">
          <span>{{ displaytItemsList.length + " - " + "Items" }}</span>
        </div>
        <div class="col-xl-6 col-md-4 col-12 del-parent text-end">
          <span
            @click="
              $router.push({
                name: 'deleteAllItems',
                params: {
                  deleteItemsMenu: moveById,
                  deleteAllItems: deletebyId,
                },
              })
            "
            v-if="displaytItemsList.length > 0"
            class="btn btn-danger del-all del-all-btn"
          >
            Delete All
            <font-awesome-icon :icon="['fa', 'trash-restore']" />
          </span>
        </div>
      </div>
      <!---------------------------->

      <table class="table table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="itemList in displaytItemsList" :key="itemList.id">
            <td>{{ itemList.name }}</td>
            <td>{{ itemList.size }}</td>
            <td>{{ itemList.price }}</td>
            <th class="action">
              <span
                class="delPage"
                @click="
                  $router.push({
                    name: 'updateItem',
                    params: {
                      updateItemsMenu: moveById,
                      updateItems: deletebyId,
                      updateItemId: itemList.id,
                    },
                  })
                "
                >Update
                <font-awesome-icon :icon="['fa', 'trash-restore']" />
              </span>
              <span
                class="delPage"
                @click="
                  $router.push({
                    name: 'deleteItem',
                    params: {
                      deleteItemsMenu: moveById,
                      deleteItems: deletebyId,
                      delteItemId: itemList.id,
                    },
                  })
                "
                >Delete
                <font-awesome-icon :icon="['fa', 'trash-restore']" />
              </span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Header from "../Header/Header.vue";
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
import { deleteCategory } from "../Modules/Menue/deleteCategory";
import { listOfItems } from "../Modules/Menue/listOfItems";
export default {
  setup() {
    const addCateg = addCategory();
    const MyMenue = menu();
    const list = listOfItems();
    const del = deleteCategory();
    return { ...addCateg, ...del, ...MyMenue, ...list };
  },
  components: {
    Header,
  },
  name: "itemsComp",
  beforeMount() {
    this.moveById = this.$route.params.ItemsMenu;
    this.deletebyId = this.$route.params.Items;
    this.userInfo();
    this.getAllItemsToDelete();
    this.canUserAccessThisLocation(this.userId, this.moveById, "home");
    this.displatItemsListrelatedToOneCategory();
    setInterval(() => {
      this.randomImages();
    }, 5000);
  },
};
</script>
<style lang="scss" scoped>
.body {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 1s;
  h1 {
    text-shadow: 5px 5px 5px blue;
    color: white;
    -webkit-text-stroke: 0.5px orangered;
    -webkit-text-fill-color: gray;
  }
  #cont {
    z-index: 999;
    position: relative;
  }
  .action {
    span {
      background-color: rgb(1, 21, 85);
      transition: 0.5s;
      &:hover {
        color: yellowgreen;
        scale: 1.1;
      }
    }
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
  .view-category {
    position: relative;
    left: 10px;
  }
  h1 {
    font-size: 30px;
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
}
.del-all-btn {
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
.delPage,
.updateLocations {
  text-decoration: none;
}

.itemsNum {
  text-shadow: 5px 5px 3px rgb(39, 219, 99);
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  -webkit-text-fill-color: white;
  font-weight: bold;
}
table {
  table-layout: fixed;
  text-align: center;
  width: 105%;
  position: relative;
  right: 20px;
  .action {
    span {
      display: inline-block;
      text-align: center;
      background-color: rgb(65, 65, 161);
      color: white;
      margin-left: 5px;
      padding: 7px 10px;
      border-radius: 5px;
      width: 80px;
      position: relative;
      right: 8px;
    }
  }
  .num {
    width: 100px;
  }
  th,
  td {
    border-spacing: none;
    border: solid gray 1px;
  }
}
@media (max-width: 1199px) {
  .del-all {
    span {
      width: 190px;
    }
  }
  table {
    width: 120%;
    right: 92px;
    .action {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
      span {
        position: relative;
        top: 2.5px;
        width: 120px;
        left: 0px;
        display: inline-block;
        padding: 10px;
      }
    }
    th,
    td {
      height: 90px;
    }
  }
}
@media (max-width: 1145px) {
  .del-all {
    word-spacing: 1px;
    position: relative;
    right: 20px;
  }
  table {
    width: 100%;
    margin-left: 80px;
    .num {
      width: 100px;
    }
  }
}
@media (max-width: 991px) {
  table {
    .action {
      span {
        width: 100px;
      }
    }
  }
}
@media (max-width: 767px) {
  .del-parent,
  .itemsNum {
    display: flex;
    justify-content: center;
    text-decoration: none;
  }
  .del-all {
    left: 5px;
    top: 10px;
  }
  table {
    width: 125%;
    right: 140px;
    .action {
      span {
        width: 200px;
        font-size: 12px;
      }
    }
  }
}
@media (max-width: 670px) {
  table {
    width: 110%;
    right: 100px;
    .action {
      height: 100px;
      display: flex;
      flex-wrap: wrap;
      span {
        letter-spacing: 0px;
        width: 80px;
        font-size: 12px;
      }
    }
    td {
      font-size: 18px;
    }
  }
}
@media (max-width: 595px) {
  table {
    width: 90%;
    right: 45px;
    td {
      font-size: 12px;
    }
  }
}
@media (max-width: 550px) {
  table {
    td,
    th {
      height: 100px;
    }
    .action {
      height: 100%;
      span {
        letter-spacing: 0px;
        width: 60px;
        font-size: 11px;
      }
    }
  }
}
@media (max-width: 500px) {
  table {
    .action {
      span {
        letter-spacing: 0.5px;
        width: 60px;
        font-size: 10px;
      }
    }
    td {
      font-size: 8px;
    }
  }

  @media (max-width: 440px) {
    table {
      right: 60px;
      .num {
        width: 60px;
      }
      th {
        font-size: 11px;
      }
    }
  }
}

@media (max-width: 385px) {
  table {
    right: 75px;
    th,
    td {
      font-size: 5px;
      width: 82px;
    }
    .num {
      width: 55px;
    }
  }
}
@media (width: 375px) {
  table {
    right: 65px;
  }
}
@media (max-width: 365px) {
  table {
    right: 70px;
    .action {
      span {
        letter-spacing: 0px;
        width: 55px;
      }
    }
    th,
    td {
      width: 78px;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 339px) {
  table {
    td,
    th {
      width: 9px;
      height: 100px;
    }
    .action {
      span {
        padding: 5px;
      }
    }
  }
}
@media (max-width: 326px) {
  table {
    right: 77px;
    text-align: start;

    th,
    td {
      width: 70px;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 305px) {
  .body {
    #cont {
      table {
        right: 70px;
        th,
        td {
          width: 60px;
          height: 20px;
        }
        .action {
          width: 100%;
          height: 100%;
          span {
            font-size: 10px;
            padding: 5px 0 5px 0;
            width: 50px;
            display: inline-block;
            text-align: center;
          }
        }
      }
    }
  }
}

@media (max-width: 290px) {
  table {
    .action {
      span {
        padding: 5px 0 5px 0;
        width: 60px;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
@media (max-width: 270px) {
  .body {
    #cont {
      table {
        right: 75px;
        th,
        td {
          width: 60px;
        }
        .action {
          span {
            padding: 5px 0 5px 0;
            width: 200px;
            display: inline-block;
            text-align: center;
          }
        }
      }
    }
  }
}
@media (max-width: 260px) {
  .body {
    #cont {
      table {
        right: 90px;
        th,
        td {
          width: 58px;
        }
        .action {
          span {
            padding: 5px 0 5px 0;
            display: inline-block;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
