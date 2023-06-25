<template>
  <div class="row mt-5 justify-content-center">
    <div class="col-xl-6 col-md-8 col-12 itemsNum">
      <span>{{ listOfLocations.length + " - " + "Locations" }}</span>
    </div>
    <div class="col-xl-6 col-md-4 col-12 del-parent text-end">
      <span
        @click="
          $router.push({
            name: 'TrashAllLocations',
          })
        "
        v-if="listOfLocations.length > 0"
        class="btn btn-danger del-all del-all-btn"
      >
        Delete All
        <font-awesome-icon :icon="['fa', 'trash-restore']" />
      </span>
    </div>
  </div>
  <table class="table table-dark mt-5">
    <thead class="thead-dark">
      <tr>
        <!--
        <th class="num" scope="col">number</th>
        -->
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Adress</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="location in listOfLocations" :key="location.id">
        <!--
        <th scope="row">{{ location.id }}</th>

        -->
        <td>{{ location.name }}</td>
        <td>{{ location.phone }}</td>
        <td>{{ location.adress }}</td>
        <th class="action" scope="row">
          <!--params locationId should be in router also to redirect you to the delete page holding id-->
          <router-link
            class="delPage"
            :to="{
              name: 'DeletePage',
              params: { locationId: location.id },
            }"
          >
            <span
              >Delete
              <font-awesome-icon :icon="['fa', 'trash-restore']" />
            </span>
          </router-link>
          <router-link
            class="updateLocations"
            :to="{
              name: 'UpdateLocations',
              params: { UpdatelocationId: location.id },
            }"
          >
            <span
              >Update
              <font-awesome-icon :icon="['fa', 'pencil']" />
            </span>
          </router-link>
          <router-link
            class="updateLocations"
            :to="{
              name: 'MenuPage',
              params: { menuLocationId: location.id },
            }"
          >
            <span
              >Menu
              <font-awesome-icon :icon="['fa', 'list-squares']" />
            </span>
          </router-link>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { DeleteLocation } from "../Modules/DeleteLocations/DeleteDataLocation";
import { LocationList } from "../Modules/ListOfLocation/ListOfLocationModule";
export default {
  setup() {
    const del = DeleteLocation();
    const Locations = LocationList();
    return { ...del, ...Locations };
  },

  name: "userLocations",
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "SignUp" });
    } else {
      this.userId = JSON.parse(user).id;
    }
    this.restaurantData();
  },
};
</script>

<style lang="scss" scoped>
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
      text-shadow: 5px 5px 5px rgb(44, 240, 18);

      background-color: rgb(5, 4, 66);
      color: white;
      margin-left: 5px;
      padding: 7px 10px;
      border-radius: 5px;
      width: 80px;
      position: relative;
      right: 8px;

      transition: 0.6s;
      &:hover {
        scale: 1.1;
      }
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
      display: grid;
      grid-template-columns: 1fr;
      position: relative;
      width: 100%;
      span {
        position: relative;
        top: 2.5px;
        width: 120px;
        left: 1px;
        display: inline-block;
      }
    }
    th,
    td {
      height: 150px;
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
        width: 100px;
      }
    }
  }
}
@media (max-width: 670px) {
  table {
    width: 110%;
    right: 100px;
    .action {
      height: 180px;
      span {
        letter-spacing: 1px;
        width: 70px;
        font-size: 12px;
      }
    }
    td {
      font-size: 14px;
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
    .action {
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
    th {
      font-size: 5px;
    }
    .num {
      width: 55px;
    }
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
      width: 77px;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 340px) {
  table {
    right: 80px;
    text-align: start;
    .action {
      span {
        margin-right: 7px;
      }
    }
    th,
    td {
      width: 73px;
      box-sizing: border-box;
    }
  }
}

@media (max-width: 320px) {
  table {
    right: 70px;
    text-align: start;
    .action {
      span {
        margin-right: 7px;
      }
    }
    th,
    td {
      width: 60px;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 315px) {
  table {
    right: 68px;
    text-align: start;
    .action {
      span {
        margin-right: 7px;
        width: 55px;
      }
    }
    th,
    td {
      width: 40px;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 290px) {
  table {
    .action {
      span {
        padding: 15px 0 15px 0;
        width: 50px;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
@media (max-width: 270px) {
  table {
    td,
    th {
      word-break: break-word;
    }
    .action {
      span {
        padding: 10px 0 10px 0;
        width: 35px;
        display: inline-block;
        text-align: center;
      }
    }
  }
}
@media (max-width: 240px) {
  table {
    td,
    th {
      width: 50px;
    }
  }
}
</style>
