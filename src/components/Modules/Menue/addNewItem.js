import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { maxLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, toRefs } from "vue";
export const addNewItem = () => {
  const state = reactive({
    categName: "",
    deletebyId: "",
    moveById: "",
    userId: "",
    mealName: "",
    mealSize: "",
    price: "",
    categId: "",
    updateItemName: "",
    updateItembyId: "",
    listOfCategories: [],
    ItemsuccessMessage: "",
    listOfItems: [],
  });
  // rules vlidation
  const rules = computed(() => {
    return {
      mealName: { required, maxLength: maxLength(15) },
      mealSize: { required },
    };
  });
  const v$ = useVuelidate(rules, state);
  const userInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  // determain price independent on size
  const deterMainPrice = () => {
    if (state.mealSize == "Large") {
      state.price = "500$";
    } else if (state.mealSize == "Medium") {
      state.price = "300$";
    } else if (state.mealSize == "Small") {
      state.price = "200$";
    }
  };
  //display category name in add item page
  const diplayItemCategory = async () => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}&locationId=${state.moveById}&id=${state.deletebyId}`
    );
    if (result.status == 200) {
      state.listOfCategories = result.data;
      state.categName = state.listOfCategories[0].name;
    }
  };
  //get one item to update
  const getOneItemToUpdate = async () => {
    let result = await axios.get(
      `http://localhost:3000/items?userId=${state.userId}&locationId=${state.moveById}&CateglocationId=${state.deletebyId}&id=${state.updateItembyId}`
    );
    if (result.status == 200) {
      state.updateItemName = result.data[0].name;
    }
  };

  // get all items names to avoid reapeating inserting the same item
  const getAllItems = async () => {
    let result = await axios.get(`http://localhost:3000/items`);
    if (result.status == 200) {
      state.listOfItems = result.data;
      console.log(state.listOfItems);
    }
  };
  //update item
  const UpdateItem = async () => {
    v$.value.$validate();
    const filterItem = state.listOfItems.filter((e) => {
      return e.name == state.mealName;
    });
    if (!v$.value.$error) {
      if (filterItem.length > 0) {
        state.ItemsuccessMessage =
          "item name is exist befor please choose another one";
      } else {
        let result = await axios.put(
          `http://localhost:3000/items/${state.updateItembyId}`,
          {
            name: state.mealName,
            size: state.mealSize,
            price: state.price,
            userId: state.userId,
            locationId: state.moveById,
            CateglocationId: state.deletebyId,
          }
        );
        if (result.status == 200) {
          state.ItemsuccessMessage = "item updated succefully";
          setTimeout(() => {
            router.push({
              name: "ItemsPage",
              params: { ItemsMenu: state.moveById, Items: state.deletebyId },
            });
          }, 2000);
        }
      }
    }
  };
  // add new item
  const addNewCategoryItem = async () => {
    v$.value.$validate();
    // make validation to avoid inserting same name
    const filterName = state.listOfItems.filter((e) => {
      return e.name.toLocaleLowerCase() == state.mealName.toLocaleLowerCase();
    });
    if (!v$.value.$error) {
      if (filterName.length > 0) {
        state.ItemsuccessMessage =
          "this item is exist please choose another name";
        setTimeout(() => {
          state.ItemsuccessMessage = "";
        }, 2500);
      } else {
        let result = await axios.post(`http://localhost:3000/items`, {
          name: state.mealName,
          size: state.mealSize,
          price: state.price,
          userId: state.userId,
          locationId: state.moveById,
          CateglocationId: state.deletebyId,
        });
        if (result.status == 201) {
          state.ItemsuccessMessage = "item has been inserted";
          state.price = "";
          state.mealName = "";
          state.mealSize = "";
          v$.value.mealName.$errors[0].$message = "";
          v$.value.mealSize.$errors[0].$message = "";
          setTimeout(() => {
            router.push({
              name: "ItemsPage",
              params: { ItemsMenu: state.moveById, Items: state.deletebyId },
            });
          }, 2000);
        }
      }
    }
  };
  return {
    ...toRefs(state),
    userInfo,
    deterMainPrice,
    diplayItemCategory,
    addNewCategoryItem,
    v$,
    getAllItems,
    getOneItemToUpdate,
    UpdateItem,
  };
};
