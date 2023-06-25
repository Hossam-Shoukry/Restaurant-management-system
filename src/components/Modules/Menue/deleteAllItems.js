import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const deleteAllItems = () => {
  const state = reactive({
    listOfItems: [],
    userId: "",
    ItemlocationId: "",
    categId: "",
    successMessage: "",
    categName: "",
    listOfCategories: [],
    updateItemById: "",
  });
  const getUserInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    } else {
      router.push({ name: "home" });
    }
  };
  // get categName
  const getCategName = async (locationId) => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}&locationId=${locationId}&id=${state.categId}`
    );
    if (result.status == 200) {
      state.listOfCategories = result.data;
      state.categName = state.listOfCategories[0].name;
    }
  };
  const getAllItemsId = async (locationId) => {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${state.userId}&locationId=${locationId}&CateglocationId=${state.categId}`
    );
    if (result.status == 200) {
      for (let i = 0; i < result.data.length; i++) {
        state.listOfItems.push(result.data[i].id);
      }
    }
  };
  const deleteAllItems = async (locationId) => {
    for (let i = 0; i < state.listOfItems.length; i++) {
      await axios.delete(`http://localhost:3000/items/${state.listOfItems[i]}`);
    }
    state.successMessage = `All Items related To ${state.categName} has been deleted`;
    setTimeout(() => {
      router.push({
        name: "ItemsPage",
        params: { ItemsMenu: locationId, Items: state.categId },
      });
    }, 2000);
  };
  return {
    ...toRefs(state),
    getUserInfo,
    getAllItemsId,
    getCategName,
    deleteAllItems,
  };
};
