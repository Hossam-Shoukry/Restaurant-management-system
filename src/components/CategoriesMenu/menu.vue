<template>
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
                params: { viewCategory: locationId },
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
        <div class="col-lg-2 col-md-3 col-sm-12 col-12 text-center">
          <div
            @click="
              $router.push({
                name: 'addnewMenuCategory',
                params: { AddCategory: locationId },
              })
            "
            class="btn menu"
            v-if="listOfLocations.length > 0"
          >
            Add Category
            <font-awesome-icon
              class="menu-icon"
              :icon="['fa', 'bowl-rice']"
              size="2xl"
            />
          </div>
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
      <!--Slider Part-->
      <div class="row justify-content-center mt-3 mb-5">
        <div class="col-8 text-center">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="true"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="@/assets/meal1.jpg"
                  class="d-block w-100"
                  alt=""
                  style="border-radius: 20px"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="@/assets/meal2.jpg"
                  class="d-block w-100"
                  alt=""
                  style="border-radius: 20px"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="@/assets/meal3.jpg"
                  class="d-block w-100"
                  alt=""
                  style="border-radius: 20px"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="@/assets/meal4.jpg"
                  class="d-block w-100"
                  alt=""
                  style="border-radius: 20px"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { menu } from "@/components/Modules/Menue/MyMenue";
import { addCategory } from "../Modules/Menue/addCategory";
export default {
  name: "menuComponent",
  setup() {
    const addCateg = addCategory();
    const menuFunc = menu();
    return { ...addCateg, ...menuFunc };
  },
  beforeMount() {
    this.locationId = this.$route.params.menuLocationId;
    this.isLoggedInUser();
    this.canUserAccessThisLocation(
      this.loggedInUserId,
      this.locationId,
      "home"
    );
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
    font-size: 10px;
    border-radius: 20px;
    padding: 10px;
    width: 80px;
    font-weight: bolder;
  }
}
</style>
