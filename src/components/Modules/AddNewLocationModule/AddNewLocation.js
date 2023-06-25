import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, toRefs } from "vue";

export const AddNewLocation = () => {
  const state = reactive({
    name: "",
    phone: "",
    adress: "",
    userId: "",
    listOfLocations: [],
    successMessage: "",
  });
  const rules = computed(() => {
    return {
      name: { required, minLength: minLength(10) },
      phone: { required, minLength: minLength(10) },
      adress: { required, minLength: minLength(10) },
    };
  });
  // get all locations to make validation
  const getAllLocations = async () => {
    let result = await axios.get(
      `http://localhost:3000/locations?userId=${state.userId}`
    );
    if (result.status == 200) {
      state.listOfLocations = result.data;
    }
  };
  // add location function
  const v$ = useVuelidate(rules, state);
  const addLocation = async () => {
    v$.value.$validate();
    const locatioFilter = state.listOfLocations.filter((e) => {
      return e.name == state.name;
    });
    if (!v$.value.$error) {
      if (locatioFilter.length > 0) {
        state.successMessage =
          "location name is exist please choose another one";
        setTimeout(() => {
          state.successMessage = "";
        }, 2500);
      } else {
        let result = await axios.post("http://localhost:3000/locations", {
          name: state.name,
          phone: state.phone,
          adress: state.adress,
          userId: state.userId,
        });
        if (result.status == 201) {
          state.successMessage = "data has been adedd succefuly";

          state.name = "";
          state.phone = "";
          state.adress = "";
          v$.value.name.$errors[0].$message = "";
          v$.value.phone.$errors[0].$message = "";
          v$.value.adress.$errors[0].$message = "";
          setTimeout(() => {
            router.push({ path: "/" });
          }, 2000);
        } else {
          state.successMessage =
            "there is some errorr please review you inputs";
        }
      }
    }
  };
  return { ...toRefs(state), v$, addLocation, getAllLocations };
};
