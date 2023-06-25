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
      <!--------display user location--------->
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center">
            {{ locationName }}
            <p class="text-muted">{{ locationAdress }}</p>
          </h1>
        </div>
      </div>
      <!--------------------- display category name ---------------------->
      <div class="row">
        <div class="col-12 text-center">
          <strong>
            Are you sure you want to delete category#<span>{{
              displayCategName
            }}</span>
          </strong>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-12 text-center">
          <div
            @click="
              $router.push({
                name: 'viewCategories',
                params: { viewCategory: moveById },
              })
            "
            class="btn btn-back"
            style="margin-left: 5px"
          >
            GoBack
          </div>
          <div class="col-12 text-center">
            <div class="btn btn-del" @click="deleteUserCategory(moveById)">
              Delete !
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 text-center text-warning">
        <span v-if="successmessage">{{ successmessage }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteCategory } from "@/components/Modules/Menue/deleteCategory";
import Header from "../Header/Header.vue";
import { menu } from "../Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";

export default {
  setup() {
    const addCateg = addCategory();
    const MyMenue = menu();
    const deleteCateg = deleteCategory();
    return { ...addCateg, ...deleteCateg, ...MyMenue };
  },
  name: "deleteCategoryComp",
  components: {
    Header,
  },
  beforeMount() {
    this.moveById = this.$route.params.deleteCateg;
    this.deletebyId = this.$route.params.MenuDeleteCateg;
    console.log("primary=>" + this.moveById);
    console.log("secondary=>" + this.deletebyId);
    this.deleteInfo();
    this.displayUserCategoryName();
    this.canUserAccessThisLocation(this.userId, this.moveById, "home");
    this.getAllItemsToDelete();
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
    position: relative;
    left: 5px;
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
    margin-left: 3px;
  }
}
@media (max-width: 451px) {
  .body {
    span {
      margin-left: 10px;
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
      font-size: 20px;
    }
    span {
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
      font-size: 17px;
    }
    span {
      font-size: 15;
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
@media (max-width: 330px) {
  .body {
    span {
      position: relative;
      left: 10px;
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
    span {
      position: relative;
      left: 10px;
    }

    .btn-back,
    .btn-del {
      font-size: 15px;
      position: relative;
      top: 15px;
      right: 15px;
    }
  }
}
</style>
