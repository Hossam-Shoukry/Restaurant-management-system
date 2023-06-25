import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { email, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, ref, toRefs } from "vue";

export const Loginvalidations = () => {
  const state = reactive({
    email: "",
    pass: "",
  });
  const rules = computed(() => {
    return {
      email: { required, email, minLength: minLength(10) },
      pass: { required, minLength: minLength(10) },
    };
  });

  const v$ = useVuelidate(rules, state);
  const userNotFound = ref("");
  const loginIn = async () => {
    v$.value.$validate();
    if (!v$.value.$error) {
      let result = await axios.get(
        `http://localhost:3000/users?email=${state.email}&pass=${state.pass}`
      );
      //make sure if there is data in user database or not
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        router.push({ path: "/" });
      } else {
        console.log("error");
        userNotFound.value = ref("user name or password is wrong");
      }
    }
  };

  return { ...toRefs(state), loginIn, v$, userNotFound };
};
