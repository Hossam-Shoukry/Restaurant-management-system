import axios from "axios";
import { reactive, toRefs } from "vue";

export const listOfItems = () => {
  const state = reactive({
    deletebyId: "",
    moveById: "",
    userId: "",
    displaytItemsList: [],
  });
  const userInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  // get all items realted to 1 category
  const displatItemsListrelatedToOneCategory = async () => {
    let result = await axios.get(
      `http://localhost:3000/items?userId${state.userId}&locationId${state.moveById}&CateglocationId=${state.deletebyId}`
    );
    if (result.status == 200) {
      state.displaytItemsList = result.data;
      console.log("display list of items" + state.displaytItemsList);
    }
  };
  return { ...toRefs(state), userInfo, displatItemsListrelatedToOneCategory };
};
