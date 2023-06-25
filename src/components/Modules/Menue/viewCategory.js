import axios from "axios";
import { reactive, toRefs } from "vue";

export const viewCategory = () => {
  const state = reactive({
    viewMyCategory: "",
    name: "",
    successMessage: "",
    errorrMessage: "",
    MyLocationId: "",
    viewlistOfCategories: [],
  });
  const viewUserCategories = async (userId, locationId) => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${userId}&locationId=${locationId}`
    );
    if (result.status == 200) {
      state.viewlistOfCategories = result.data;
      console.log("value is write");
      console.log(state.viewlistOfCategories);
    } else {
      console.log("value is wrong");
    }
  };
  return { ...toRefs(state), viewUserCategories };
};
