<template>
  <div
    class="body"
    :style="{
      backgroundImage: `url(${require('@/assets/' + randomImages() + '')})`,
    }"
  >
    <h1 class="text-center pt-5">Wellcome at Restaurant Management App</h1>

    <div class="container">
      <div class="row justify-content-center mt-5 text-white myForm">
        <div class="col-lg-8 col-sm-10 col-11" style="min-height: 300px">
          <h1 class="pt-2" style="display: flex; justify-content: center">
            Login
          </h1>
          <form action="" @click.prevent="" class="">
            <div class="row g-3">
              <div
                class="col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10 mx-auto"
              >
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Your Email"
                  v-model.lazy.trim="email"
                />
                <div
                  style="display: flex; justify-content: center"
                  class="text-danger mt-3"
                  v-if="v$.email.$error"
                >
                  {{ v$.email.$errors[0].$message }}
                </div>
                <div
                  style="display: flex; justify-content: center"
                  class="text-danger"
                  v-if="userNotFound"
                >
                  {{ userNotFound }}
                </div>
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
                  v-model.lazy.trim="pass"
                />
                <div
                  style="display: flex; justify-content: center"
                  class="text-danger mt-3"
                  v-if="v$.pass.$error"
                >
                  {{ v$.pass.$errors[0].$message }}
                </div>
                <div
                  style="display: flex; justify-content: center"
                  class="text-danger"
                  v-if="userNotFound"
                >
                  {{ userNotFound }}
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-lg-6 mx-auto col-md-6 col-sm-6 text-center">
                <span
                  @click="redirectTo({ val: 'SignUp' })"
                  type="submit"
                  class="btn update sign"
                >
                  Sign Up Now
                </span>
              </div>
              <div class="col-lg-6 mx-auto col-md-6 col-sm-6 parent-login">
                <span
                  @click="loginIn()"
                  style="margin-left: 10px"
                  type="submit"
                  class="btn update login"
                >
                  Login Now
                </span>
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
import { mapActions } from "vuex";
import { addCategory } from "../Modules/Menue/addCategory";
import { Loginvalidations } from "../Modules/ValidationModules/Loginvalidations";
export default {
  setup() {
    const addCateg = addCategory();
    const loginValidations = Loginvalidations();
    return { ...addCateg, ...loginValidations };
  },

  name: "LoginPage",
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
    setInterval(() => {
      this.randomImages();
    }, 5000);
  },

  methods: {
    /*   signUpPage() {
            this.$router.push({ path: "/signup" });
            this.$router.push({ name: "SignUp" });
        },*/
    ...mapActions(["redirectTo"]),
  },
};
</script>

<style lang="scss" scoped>
.body {
  left: 0;
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 0.3s;
  .container {
    display: flex;
    justify-content: center;
  }
  h1 {
    text-shadow: 6px 6px 6px rgb(10, 29, 204);
  }
  .myForm {
    width: 50em;
    border-radius: 20px;
    position: relative;
    top: 30px;
    background-color: rgb(29, 66, 60);
    form {
      input {
        border-radius: 50px;
        &:focus {
          &::-webkit-input-placeholder {
            opacity: 0;
            transition: 0.5s;
          }
        }
      }
      .login {
        position: relative;
        left: 20px;
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
@media (max-width: 991px) {
  .body {
    .container {
      .myForm {
        input {
          font-size: 15px;
          width: 450px;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .body {
    .container {
      .myForm {
        input {
          font-size: 15px;
          width: 360px;
        }
        .login {
          left: 25px;
          width: 130px;
          font-size: 18px;
        }
        .sign {
          width: 140px;
          font-size: 18px;
          padding: 7px;
          position: relative;
          left: 5px;
          bottom: 2px;
        }
      }
    }
    h1 {
      font-size: 25px;
    }
  }
}
@media (max-width: 575px) {
  .body {
    .myForm {
      width: 30em;
      .parent-login {
        display: flex;
        justify-content: center;
        padding-right: 60px;
        margin-top: 5px;
      }
      .login {
        left: 25px;
        width: 130px;
        font-size: 18px;
      }
      .sign {
        width: 140px;
        font-size: 18px;
        padding: 7px;
        position: relative;
        left: 5px;
        bottom: 2px;
      }
    }
  }
}

@media (max-width: 495px) {
  .body {
    .container {
      .myForm {
        width: 25em;
        input {
          font-size: 15px;
          width: 320px;
        }
        .login {
          left: 25px;
          width: 130px;
          font-size: 18px;
        }
        .sign {
          width: 140px;
          font-size: 18px;
          padding: 7px;
          position: relative;
          left: 5px;
          bottom: 2px;
        }
      }
    }
    h1 {
      font-size: 20px;
    }
  }
}
@media (max-width: 425px) {
  .body {
    .container {
      .myForm {
        width: 18em;
        input {
          font-size: 15px;
          width: 220px;
        }
        .login {
          left: 25px;
          width: 110px;
          font-size: 15px;
        }
        .sign {
          width: 120px;
          font-size: 15px;
          padding: 7px;
          position: relative;
          left: 5px;
          bottom: 2px;
        }
      }
    }
    h1 {
      font-size: 25px;
    }
  }
}
@media (max-width: 330px) {
  .body {
    .container {
      .myForm {
        width: 18em;
        input {
          font-size: 15px;
          width: 220px;
        }
        .login {
          left: 25px;
          width: 120px;
          font-size: 14px;
        }
        .sign {
          width: 120px;
          font-size: 14px;
          padding: 7px;
          position: relative;
          left: 5px;
          bottom: 2px;
        }
      }
    }
    h1 {
      font-size: 20px;
    }
  }
}
@media (max-width: 297px) {
  .body {
    .container {
      .myForm {
        width: 14.5em;
        input {
          font-size: 15px;
          width: 185px;
        }
        .login {
          left: 25px;
          width: 120px;
          font-size: 14px;
        }
        .sign {
          width: 120px;
          font-size: 14px;
          padding: 7px;
          position: relative;
          left: 5px;
          bottom: 2px;
        }
      }
    }
    h1 {
      font-size: 20px;
    }
  }
}
</style>
