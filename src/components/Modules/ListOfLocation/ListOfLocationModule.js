import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";
export const LocationList = () => {
  const state = reactive({
    userName: "",
    userId: "",
    listOfLocations: [],
  });

  const restaurantData = async () => {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${state.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      state.listOfLocations = result.data;
      router.push({ path: "/" });
    }
  };

  return { ...toRefs(state), restaurantData };
};
