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
            <h1 style="padding-left: 40px">Delete Restaurant</h1>
            <p>Are You Sure You Want To Delete All Location?</p>
          </div>
        </div>
        <div class="row g-3 align-items-center">
          <div class="col-auto mx-auto d-block text-center">
            <button @click="redirectTo({ val: 'home' })" class="btn btn-back">
              Go Back
            </button>
            <div class="col-12 text-center">
              <button class="btn btn-del" @click="DeleteAllLocationsData()">
                Delete Now
              </button>
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
  name: "DeleteAllLocationItems",
  components: {
    Header,
  },
  setup() {
    const addCateg = addCategory();
    const deleteAll = DeleteLocation();
    return { ...addCateg, ...deleteAll };
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      this.userId = user.id;
    } else {
      this.redirectTo("SignUp");
    }
    this.GetAllLocationDataId();
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
        margin-right: 35px;
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
      margin-top: 15px;
    }
    .btn-del {
      color: white;
      background-color: rgba(4, 4, 34, 0.966);
      margin-top: 10px;
    }
  }
}
@media (max-width: 459px) {
  .container {
    p {
      width: 300px;
    }
  }
}
@media (max-width: 420px) {
  .container {
    h1 {
      font-size: 25px;
    }
  }
}
@media (max-width: 385px) {
  .btn-del,
  .btn-back {
    font-size: 13px;
    font-weight: bold;
  }
  .btn-del {
    width: 100px;
  }
}
@media (max-width: 315px) {
  .container {
    h1 {
      font-size: 20px;
    }
    p {
      width: 250px;
    }
  }
}
@media (max-width: 266px) {
  .container {
    h1 {
      font-size: 20px;
    }
    p {
      width: 200px;
      margin-left: 20px;
    }
  }
}
</style>
