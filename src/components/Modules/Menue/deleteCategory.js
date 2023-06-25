import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const deleteCategory = () => {
  const state = reactive({
    userId: "",
    deletebyId: "",
    moveById: "",
    displayCategName: "",
    categNum: "",
    successmessage: "",
    lisOfCategories: [],
    listOfItems: [],
  });
  // get user info from local storage
  const deleteInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  //get category name to display it im delete page
  const displayUserCategoryName = async () => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}&id=${state.deletebyId}`
    );
    if (result.status == 200) {
      state.displayCategName = result.data[0].name;
      state.categNum = result.data[0].id;
    }
  };
  // get all related items to delete
  const getAllItemsToDelete = async () => {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${state.userId}&CateglocationId=${state.deletebyId}&locationId=${state.moveById}`
    );
    if (result.status == 200) {
      for (let i = 0; i < result.data.length; i++) {
        state.listOfItems.push(result.data[i].id);
      }
      console.log("list of items" + state.listOfItems);
    }
    console.log(state.listOfItems);
    console.log(state.deletebyId);
  };
  // delete category by it's id
  const deleteUserCategory = async (paramLink) => {
    let result1 = await axios.delete(
      `http://localhost:3000/categories/${state.deletebyId}`
    );

    if (result1.status == 200) {
      for (let i = 0; i < state.listOfItems.length; i++) {
        await axios.delete(
          `http://localhost:3000/items/${state.listOfItems[i]}`
        );
      }
      state.successmessage = "item has been removed and all it's realted items";
      setTimeout(() => {
        router.push({
          name: "viewCategories",
          params: { viewCategory: paramLink },
        });
      }, 2000);
    }
  };
  return {
    ...toRefs(state),
    displayUserCategoryName,
    deleteInfo,
    deleteUserCategory,
    getAllItemsToDelete,
  };
};
