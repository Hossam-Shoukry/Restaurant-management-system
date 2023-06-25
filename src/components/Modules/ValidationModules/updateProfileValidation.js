import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, ref, toRefs } from "vue";

export const Updatevalidations = () => {
  const state = reactive({
    name: "",
    email: "",
    pass: "",
    id: "",
    listOfUser: [],
  });
  const rules = computed(() => {
    return {
      name: { required },
      email: { required, email, minLength: minLength(10) },
      pass: { required, minLength: minLength(10) },
    };
  });
  const v$ = useVuelidate(rules, state);
  const Updateuser = ref("");
  //get user info to make validation
  const getUserInfo = async () => {
    let result = await axios.get(`http://localhost:3000/users/${state.id}`);
    if (result.status == 200) {
      state.listOfUser.push(result.data);
    }
  };
  const updateProfile = async () => {
    v$.value.$validate();
    const filterName = state.listOfUser.filter((e) => {
      return e.name == state.name;
    });
    if (!v$.value.$error) {
      if (filterName.length > 0) {
        Updateuser.value = "you can't update with same name";
      } else {
        let result = await axios.put(
          `http://localhost:3000/users/${state.id}`,
          {
            name: state.name,
            email: state.email,
            pass: state.pass,
          }
        );
        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data);
          Updateuser.value = "user info successfuly updated";
          setTimeout(() => {
            router.push({ path: "profile" });
          }, 2500);
        } else {
          Updateuser.value = ref(`ther is no user called with this name`);
        }
      }
    }
  };

  return { ...toRefs(state), updateProfile, v$, Updateuser, getUserInfo };
};
