import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const menu = () => {
  const state = reactive({
    userName: "",
    isUserLoggedIn: "",
    loggedInUserId: "",
    locationId: "",
    listOfLocations: [],
    locationName: "",
    locationAdress: "",
  });
  // get some info from local storage
  const isLoggedInUser = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.isUserLoggedIn = true;
      state.loggedInUserId = user.id;
    } else {
      state.isUserLoggedIn = false;
    }
  };
  // get length of data category

  // create user accessability
  const canUserAccessThisLocation = async (
    userId,
    locationId,
    locationLink
  ) => {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${userId}&id=${locationId}`
    );
    if (result.status == 200) {
      //[1] get current location info
      state.listOfLocations = result.data;
      console.log("list of locations =>" + state.listOfLocations);
      //[2] make validation for users to prevent them from accessing to other users info
      if (state.listOfLocations.length !== 1) {
        router.push({ name: locationLink });
      }
      //display location info inside varibales
      state.locationName = state.listOfLocations[0].name;
      state.locationAdress = state.listOfLocations[0].adress;
    }
  };

  return {
    ...toRefs(state),
    isLoggedInUser,
    canUserAccessThisLocation,
    // getLocationInfo,
  };
};
