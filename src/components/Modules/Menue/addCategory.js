import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { maxLength, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, toRefs } from "vue";

export const addCategory = () => {
  const state = reactive({
    userId: "",
    addMyCategory: "",
    name: "",
    successMessage: "",
    errorrMessage: "",
    MyLocationId: "",
    listOfCategories: [],
    selcted: "",
    photos: ["rest1.png", "rest2.jpg", "rest3.jpg", "rest4.jpg", "rest5.jpg"],
  });
  const userInfo = () => {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      state.userId = user.id;
    }
  };
  const randomImages = () => {
    state.selcted =
      state.photos[Math.floor(Math.random() * state.photos.length)];
    return state.selcted;
  };

  const rules = computed(() => {
    return {
      name: { required, minLength: minLength(5), maxLength: maxLength(15) },
    };
  });

  const displayUserCategories = async (userId, locationId) => {
    let result = await axios.get(
      `http://localhost:3000/categories?userId=${userId}&locationId=${locationId}`
    );
    if (result.status == 200) {
      state.listOfCategories = result.data;
      console.log(state.listOfCategories);
      console.log("user id " + " " + userId);
      console.log("location id " + " " + locationId);
    }
  };

  const v$ = useVuelidate(rules, state);
  const addMyCateg = computed(() => {
    return async () => {
      v$.value.$validate();
      //[first] you have to prevent dublicate category names
      let filterCategoryName = state.listOfCategories.filter((e) => {
        return e.name.toLocaleLowerCase() == state.name.toLocaleLowerCase();
      });

      if (!v$.value.$error) {
        //[second] make condition for name dublication
        if (filterCategoryName.length > 0) {
          state.successMessage = "name is exist please choose another name";
          //disapear message after few second
          setTimeout(() => {
            state.successMessage = "";
          }, 5000);
        } else {
          let result = await axios.post("http://localhost:3000/categories", {
            name: state.name,
            userId: state.userId,
            locationId: state.MyLocationId,
          });
          if (result.status == 201) {
            state.successMessage = "category has been added succefully";
            state.name = "";
            v$.value.name.$errors[0].$message = "";
            setTimeout(() => {
              router.push({
                name: "viewCategories",
                params: { viewCategory: state.MyLocationId },
              });
            }, 1000);
          } else {
            state.errorrMessage = "ther is an error ";
          }
        }
      }
    };
  });

  /********************* */

  return {
    ...toRefs(state),
    addMyCateg,
    v$,
    displayUserCategories,
    randomImages,
    userInfo,
  };
};
