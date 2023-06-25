import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, toRefs } from "vue";

export const updateCategory = () => {
  const state = reactive({
    userId: "",
    id1: "",
    deleteById: "",
    catgName: "",
    displayCategName: "",
    successmessage: "",
    categNum: "",
    listOfCategories: [],
  });
  // get user info from local storage
  const updateInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  // get category name to display it in the update page
  const displayCategoryName = async () => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}&id=${state.deleteById}`
    );
    if (result.status == 200) {
      state.displayCategName = result.data[0].name;
      state.categNum = result.data[0].id;
    }
  };
  // prevent update with same name
  const getAllCategories = async () => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${state.userId}`
    );
    if (result.status == 200) {
      state.listOfCategories = result.data;
      console.log(state.listOfCategories);
    }
  };
  // make validation rules by composition api
  const rules = computed(() => {
    return {
      catgName: { required },
    };
  });
  const v$ = useVuelidate(rules, state);

  // put value you want to update in the category
  const updateUserCategory = async (viewCategLink) => {
    v$.value.$validate();
    const filterName = state.listOfCategories.filter((e) => {
      return e.name == state.catgName;
    });
    if (!v$.value.$error) {
      if (filterName.length > 0) {
        state.successmessage =
          "you can't update with the same name please choose another name";
        setTimeout(() => {
          state.successmessage = "";
        }, 4000);
      } else {
        let result = await axios.put(
          `http://localhost:3000/categories/${state.deleteById}`,
          {
            name: state.catgName,
            userId: state.userId,
            locationId: state.id1,
          }
        );
        if (result.status == 200) {
          state.successmessage = "Category has been updated successfully";
          state.catgName = "";
          v$.value.$errors[0].$message = "";
          setTimeout(() => {
            router.push({
              name: "viewCategories",
              params: { viewCategory: viewCategLink },
            });
          }, 2000);
        } else {
          state.successmessage = "there is an errorr";
        }
      }
    }
  };
  return {
    ...toRefs(state),
    updateUserCategory,
    updateInfo,
    v$,
    displayCategoryName,
    getAllCategories,
  };
};
