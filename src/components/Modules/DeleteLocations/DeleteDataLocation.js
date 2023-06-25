import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const DeleteLocation = () => {
  const state = reactive({
    name: "",
    phone: "",
    adress: "",
    userId: "",
    isdeleted: "",
    restrauntLocation: "",
    locationDataArr: [],
    allLocationId: [],
    listOfCategories: [],
  });
  //comingDeletingData
  //get realted category to delete

  // get one location data to delete
  const getLocationDataToDelete = async () => {
    let result = await axios.get(
      `http://localhost:3000/locations?id=${state.restrauntLocation}&userId=${state.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      state.locationDataArr = result.data;
      state.name = state.locationDataArr[0].name;
      state.adress = state.locationDataArr[0].adress;
      state.phone = state.locationDataArr[0].phone;
    } else {
      router.push({ path: "/" });
    }
  };
  //delete one location data
  const DeleteingLocationData = async () => {
    let result = await axios.delete(
      `http://localhost:3000/locations/${state.restrauntLocation}`
    );
    if (result.status == 200) {
      state.isdeleted = "location deleted and all it's categories also";
      setTimeout(() => {
        router.push({ path: "/" });
      }, 1000);
    }
  };
  // get all locations id to delete all locations
  const GetAllLocationDataId = async () => {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${state.userId}`
    );
    if (result.status == 200) {
      for (let i = 0; i < result.data.length; i++) {
        state.allLocationId.push(result.data[i].id);
      }
    } else {
      console.log("error");
    }
  };
  //delete all locations by id which stored in array
  const DeleteAllLocationsData = async () => {
    for (let i = 0; i < state.allLocationId.length; i++) {
      let result = await axios.delete(
        `http://localhost:3000/locations/${state.allLocationId[i]}`
      );
      if (result.status == 200) {
        console.log("all deleted");
      } else {
        console.log("delete faild");
      }
    }
    router.push({ path: "/" });
  };
  return {
    ...toRefs(state),
    getLocationDataToDelete,
    DeleteingLocationData,
    GetAllLocationDataId,
    DeleteAllLocationsData,
  };
};
