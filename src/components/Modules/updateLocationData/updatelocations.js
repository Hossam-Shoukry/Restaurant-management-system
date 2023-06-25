import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, toRefs } from "vue";

export const updateLocations = () => {
  const state = reactive({
    name: "",
    phone: "",
    adress: "",
    userId: "",
    locationId: "",
    success: "",
    listOfLocations: [],
  });
  const rules = computed(() => {
    return {
      name: { required },
      phone: { required },
      adress: { required },
    };
  });
  const v$ = useVuelidate(rules, state);
  // get location info to put it in inputs elements
  const updataToCells = async () => {
    let result = await axios.get(
      `http://localhost:3000/locations?id=${state.locationId}&userId=${state.userId}`
    );
    if (result.status == 200) {
      state.name = result.data[0].name;
      state.phone = result.data[0].phone;
      state.adress = result.data[0].adress;
      state.listOfLocations = result.data;
    }
  };
  // get all locations to make validation
  const updatelocationData = async () => {
    v$.value.$validate();
    const filterInfo = state.listOfLocations.filter((e) => {
      return e.name == state.name;
    });
    if (!v$.value.$error) {
      if (filterInfo.length > 0) {
        state.success = "name is exist before please choose another name";
        setTimeout(() => {
          state.success = "";
        }, 2500);
      } else {
        let result = await axios.put(
          `http://localhost:3000/locations/${state.locationId}`,
          {
            name: state.name,
            phone: state.phone,
            adress: state.adress,
            userId: state.userId,
          }
        );
        if (result.status == 200) {
          state.success = "item has successfully updated";
          state.name = "";
          state.adress = "";
          state.phone = "";
          v$.value.name.$errors[0].$message = "";
          v$.value.phone.$errors[0].$message = "";
          v$.value.adress.$errors[0].$message = "";
          setTimeout(() => {
            router.push({ name: "home" });
          }, 1000);
        }
      }
    }
  };

  return { ...toRefs(state), updatelocationData, v$, updataToCells };
};
