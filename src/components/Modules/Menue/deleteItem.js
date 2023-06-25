import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const deleteItem = () => {
  const state = reactive({
    movedById: "",
    deletebyId: "",
    deleteItembyId: "",
    userId: "",
    itemName: "",
    listOfItems: [],
  });
  const itemInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  // get item info to display it for making sur that you want to delete it
  const displayDeletedItem = async () => {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${state.userId}&locationId=${state.movedById}&CateglocationId=${state.deletebyId}&id=${state.deleteItembyId}`
    );
    if (result.status == 200) {
      state.listOfItems = result.data;
      state.itemName = result.data[0].name;
      console.log("item name is =>" + "" + state.listOfItems);
    }
  };
  // delete item bt it's id
  const deleteItem = async () => {
    let result = await axios.delete(
      `http://localhost:3000/items/${state.deleteItembyId}`
    );
    if (result.status == 200) {
      router.push({
        name: "ItemsPage",
        params: { ItemsMenu: state.movedById, Items: state.deletebyId },
      });
    }
  };
  return { ...toRefs(state), itemInfo, displayDeletedItem, deleteItem };
};
