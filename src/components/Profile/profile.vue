<template>
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
                Update {{ name }} Profile
              </h1>
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 mx-auto"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Your Name"
                  v-model="name"
                  disabled
                />
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
                  placeholder="Enter Your Email"
                  v-model="email"
                  disabled
                />
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 d-block mx-auto"
              >
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter Your Password"
                  v-model="pass"
                  disabled
                />
              </div>
            </div>
            <br />
            <div class="row g-3 align-items-center">
              <div class="col-auto d-block mx-auto">
                <button @click="UpdateNow()" type="submit" class="btn update">
                  Update
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
import { ref } from "vue";
import { mapActions } from "vuex";
import { addCategory } from "../Modules/Menue/addCategory";
export default {
  name: "profilePage",
  setup() {
    const add = addCategory();
    const name = ref("");
    const email = ref("");
    const pass = ref("");
    return { ...add, name, email, pass };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    UpdateNow() {
      this.redirectTo({ val: "updateProfilePage" });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    }
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
  .container {
    display: flex;
    justify-content: center;
  }
  .myForm {
    width: 50em;
    border-radius: 20px;
    position: relative;
    top: 150px;
    background-color: rgb(29, 66, 60);
    form {
      input {
        border-radius: 50px;
      }
      .update {
        width: 170px;
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
