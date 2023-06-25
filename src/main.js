import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
faArrowRightFromBracket,
faBowlRice,
faDeleteLeft,
faHouseChimney,
faListSquares,
faLocation,
faPencil,
faPerson,
faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "normalize.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
library.add(
  faUser,
  faBowlRice,
  faListSquares,
  faDeleteLeft,
  faHouseChimney,
  faArrowRightFromBracket,
  faTrashRestore,
  faPencil,
  faPerson,
  faLocation
);
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
router.beforeEach((to, from, next) => {
  if (to.params.pageTitle !== undefined) {
    document.title = `${to.name} | ${to.params.pageTitle} | ${process.env.VUE_APP_TITLE}`;
  } else if (to.name == null) {
    document.title = `Unkown Page | ${process.env.VUE_APP_TITLE}`;
  } else {
    document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
  }
  next();
});
