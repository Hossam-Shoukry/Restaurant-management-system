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
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center">
            {{ locationName }}
            <p class="text-muted">{{ locationAdress }}</p>
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <strong>Are You Sure You Want To Delete </strong>
          <span>{{ listOfItems.length + "-" + "Items" }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 text-center">
          <div
            @click="
              $router.push({
                name: 'ItemsPage',
                params: { ItemsMenu: ItemlocationId, Items: categId },
              })
            "
            class="btn btn-back"
          >
            GoBack
          </div>
        </div>
        <div class="col-lg-12 text-center">
          <div class="btn btn-del" @click="deleteAllItems(ItemlocationId)">
            Delete All
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <span v-if="successMessage">
            {{ successMessage }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../Header/Header.vue";
import { addCategory } from "../Modules/Menue/addCategory";
import { deleteAllItems } from "../Modules/Menue/deleteAllItems";
import { menu } from "../Modules/Menue/MyMenue";
export default {
  setup() {
    const Mymenu = menu();
    const addCateg = addCategory();
    const delAllItems = deleteAllItems();
    return { ...addCateg, ...delAllItems, ...Mymenu };
  },
  name: "deleteAllItemsComp",
  components: {
    Header,
  },
  beforeMount() {
    this.ItemlocationId = this.$route.params.deleteItemsMenu;
    this.categId = this.$route.params.deleteAllItems;
    this.getUserInfo();
    this.getCategName(this.ItemlocationId);
    this.getAllItemsId(this.ItemlocationId);
    this.canUserAccessThisLocation(this.userId, this.ItemlocationId);
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
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.4);
  }
  .container {
    position: relative;
    z-index: 2;
  }
  h1 {
    font-size: 40px;
    margin-left: 15px;
  }
  p {
    font-size: 40px;
  }
  strong {
    color: whitesmoke;
    font-size: 25px;
    display: inline-block;
    margin-left: 40px;
    text-shadow: 6px 5px 5px rgb(12, 131, 52);
  }
  span {
    display: inline-block;
    margin-left: 10px;
    font-size: 20px;
    color: rgb(209, 247, 42);
    text-shadow: 6px 5px 5px rgb(12, 131, 52);
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
    margin-top: 15px;
  }
  .btn-del {
    color: white;
    background-color: rgba(4, 4, 34, 0.966);
    margin-top: 10px;
  }
}
@media (max-width: 451px) {
  .body {
    span {
      margin-left: 30px;
    }

    .btn-back,
    .btn-del {
      margin-left: 40px;
    }
  }
}
@media (max-width: 445px) {
  .body {
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 30px;
    }
    strong {
      font-size: 18px;
    }
  }
}

@media (max-width: 331px) {
  .body {
    h1 {
      font-size: 30px;
    }
    p {
      font-size: 25px;
    }
    strong {
      margin-right: 30px;
    }
    span {
      margin-top: 10px;
      margin-right: 20px;
    }
    .btn-back,
    .btn-del {
      position: relative;
      top: 15px;
      right: 10px;
    }
  }
}
@media (max-width: 295px) {
  .body {
    height: 360px;
    h1 {
      font-size: 25px;
    }
    p {
      font-size: 20px;
    }
    strong {
      margin-right: 30px;
    }

    .btn-back,
    .btn-del {
      font-size: 15px;
      position: relative;
      top: 15px;
      right: 12px;
    }
  }
}
</style>
