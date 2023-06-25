<template>
  <HeaderVue />
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <div class="container">
      <div class="row justify-content-center myForm" style="padding-left: 22px">
        <div class="col-lg-8 col-sm-10 col-12 text-white">
          <form action="" @click.prevent="">
            <div class="row g-3 align-items-center">
              <h1
                style="
                  margin-bottom: 5px;
                  display: flex;
                  justify-content: center;
                "
                class="pt-3"
              >
                Add New Location
              </h1>
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 mx-auto"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Your Name"
                  v-model.lazy.trim="name"
                />
                <div class="text-danger text-center" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </div>
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 mx-auto"
              >
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Your PHONE"
                  v-model.lazy.trim="phone"
                />
                <div class="text-danger text-center" v-if="v$.phone.$error">
                  {{ v$.phone.$errors[0].$message }}
                </div>
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 d-block mx-auto"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Your ADRESS"
                  v-model.lazy.trim="adress"
                />
                <div class="text-danger text-center" v-if="v$.adress.$error">
                  {{ v$.adress.$errors[0].$message }}
                </div>
                <div class="text-danger text-center mt-2" v-if="successMessage">
                  {{ successMessage }}
                </div>
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div class="col-auto d-block mx-auto">
                <button
                  style="width: 150px; font-size: 20px"
                  @click="addLocation()"
                  type="submit"
                  class="btn update"
                >
                  Add Location
                </button>
              </div>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//require("@/css/addAndUpdate.css");
import { addCategory } from "@/components/Modules/Menue/addCategory";
import { mapActions } from "vuex";
import HeaderVue from "../../Header/Header.vue";
import { AddNewLocation } from "../../Modules/AddNewLocationModule/AddNewLocation";
export default {
  name: "AddNewLocation",
  setup() {
    const Locations = AddNewLocation();
    const addCateg = addCategory();
    return { ...addCateg, ...Locations };
  },
  components: {
    HeaderVue,
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
    } else {
      this.userId = JSON.parse(user).id;
    }
    setInterval(() => {
      this.randomImages();
    }, 5000);
    this.getAllLocations();
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style lang="scss" scoped>
input {
  &:focus {
    &::-webkit-input-placeholder {
      opacity: 0;
      transition: 0.5s;
    }
  }
}

.body {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 0.3s;
  .container {
    display: flex;
    justify-content: center;
  }
  .myForm {
    width: 50em;
    border-radius: 20px;
    position: relative;
    top: 150px;
    background-color: rgb(101, 3, 110);
    form {
      input {
        border-radius: 50px;
      }
      .update {
        width: 170px;
        border-radius: 20px;
        border: none;
        color: white;
        background-color: rgb(58, 1, 63);
        font-weight: bold;
        font-size: larger;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
          color: yellow;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .body {
    h1 {
      font-size: 25px;
    }
  }
}
@media (max-width: 575px) {
  .body {
    .myForm {
      width: 30em;
    }
  }
}
@media (max-width: 495px) {
  .body {
    h1 {
      font-size: 20px;
    }
    .myForm {
      width: 26em;
      form {
        input {
          width: 18em;
          height: 35px;
        }
        .update {
          width: 120px;
        }
      }
    }
  }
}
@media (max-width: 425px) {
  .body {
    h1 {
      font-size: 15px;
    }
    .myForm {
      width: 20em;
      form {
        input {
          position: relative;
          right: 15px;
          width: 15em;
          height: 35px;
        }
        .update {
          width: 120px;
        }
      }
    }
  }
}
@media (max-width: 330px) {
  .body {
    h1 {
      font-size: 13px;
    }
    .myForm {
      width: 17em;
      form {
        input {
          position: relative;
          right: 10px;
          font-size: smaller;
          height: 35px;
        }
        .update {
          width: 120px;
        }
      }
    }
  }
}
@media (max-width: 297px) {
  .body {
    h1 {
      font-size: 10px;
    }
    .myForm {
      width: 14.8em;
      form {
        input {
          margin-right: 20px;
          font-size: 12px;
          height: 35px;
        }
        .update {
          width: 100px;
        }
      }
    }
  }
}
</style>
