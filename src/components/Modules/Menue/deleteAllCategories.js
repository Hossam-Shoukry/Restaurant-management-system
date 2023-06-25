import router from "@/router";
import axios from "axios";
import { reactive, toRefs } from "vue";

export const deleteAllCategories = () => {
  const state = reactive({
    userId: "",
    deletebyId: "",
    moveById: "",
    successmessage: "",
    lisOfCategories: [],
    lisOfItems: [],
  });
  // get user info from local storage
  const deleteAllInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  //[first] get all categories id
  const getCategId = async () => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}&locationId=${state.moveById}`
    );
    if (result.status == 200) {
      for (let i = 0; i < result.data.length; i++) {
        state.lisOfCategories.push(result.data[i].id);
      }
      console.log(state.lisOfCategories);
    }
  };
  //get realted items
  const getAllrealtedItems = async () => {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${state.userId}&locationId=${state.moveById}`
    );
    if (result.status == 200) {
      for (let i = 0; i < result.data.length; i++) {
        state.lisOfItems.push(result.data[i].id);
        console.log("list of items=>" + state.lisOfItems);
      }
    }
  };
  // delete all categories
  const deleteAllCateg = async () => {
    if (state.lisOfCategories.length > 0) {
      for (let i = 0; i < state.lisOfCategories.length; i++) {
        await axios.delete(
          `http://localhost:3000/categories/${state.lisOfCategories[i]}`
        );
      }
      for (let i = 0; i < state.lisOfItems.length; i++) {
        await axios.delete(
          `http://localhost:3000/items/${state.lisOfItems[i]}`
        );
      }
      state.successmessage = "all categories have been deleted";
      setTimeout(() => {
        router.push({
          name: "viewCategories",
          params: {
            viewCategory: state.moveById,
          },
        });
      }, 2000);
    } else {
      state.successmessage = "there are no categories to delete";
      setTimeout(() => {
        router.push({
          name: "viewCategories",
          params: {
            viewCategory: state.moveById,
          },
        });
      }, 2000);
    }
  };

  return {
    deleteAllCateg,
    deleteAllInfo,
    ...toRefs(state),
    getCategId,
    getAllrealtedItems,
  };
};
