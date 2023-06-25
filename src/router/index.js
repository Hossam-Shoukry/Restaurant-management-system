import UpdateProfileVue from "@/components/Profile/UpdateProfile.vue";
import AddCategoryToMenu from "@/views/AddCategoryToMenu.vue";
import AddLocation from "@/views/AddLocation.vue";
import DeleteCategoryNameVue from "@/views/DeleteCategoryName.vue";
import DeletePageVue from "@/views/DeletePage.vue";
import ErrorPageVue from "@/views/ErrorPage.vue";
import ItemsPageVue from "@/views/ItemsPage.vue";
import LoginVue from "@/views/Login.vue";
import MenuePageVue from "@/views/MenuePage.vue";
import ProfileVue from "@/views/Profile.vue";
import SignUpVue from "@/views/SignUp.vue";
import TrashAllLocationsVue from "@/views/TrashAllLocations.vue";
import UpdateItemPage from "@/views/UpdateItemPage.vue";
import UpdateMyCategVue from "@/views/UpdateMyCateg";
import addNewItemPageVue from "@/views/addNewItemPage.vue";
import deleteAllItemPage from "@/views/deleteAllItemPage.vue";
import deleteItemVue from "@/views/deleteItem.vue";
import locationUpdate from "@/views/locationUpdate.vue";
import viewCategoryVue from "@/views/viewCategory.vue";
import { createRouter, createWebHistory } from "vue-router";
import DeleteAllCategoriesPageVue from "../views/DeleteAllCategoriesPage.vue";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpVue,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginVue,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfileVue,
  },
  {
    path: "/updateProfile",
    name: "updateProfilePage",
    component: UpdateProfileVue,
  },
  {
    path: "/updateLocations/:UpdatelocationId",
    name: "UpdateLocations",
    component: locationUpdate,
  },
  {
    path: "/menu/:menuLocationId",
    name: "MenuPage",
    component: MenuePageVue,
  },
  {
    path: "/menu/addCategories/:AddCategory",
    name: "addnewMenuCategory",
    component: AddCategoryToMenu,
  },
  {
    path: "/menu/viewCategories/:viewCategory",
    name: "viewCategories",
    component: viewCategoryVue,
  },
  {
    path: "/menu/viewCategories/updateCategory/:updateCateg/:MenuupdateCateg",
    name: "updateCategory",
    component: UpdateMyCategVue,
  },
  {
    path: "/menu/viewCategories/deleteCategory/:deleteCateg/:MenuDeleteCateg",
    name: "DeleteCategory",
    component: DeleteCategoryNameVue,
  },
  {
    path: "/menu/viewCategories/deleteAllCategories/:CategoryMenu",
    name: "DeleteAllCategories",
    component: DeleteAllCategoriesPageVue,
  },
  {
    path: "/menu/viewCategories/Items/:ItemsMenu/:Items",
    name: "ItemsPage",
    component: ItemsPageVue,
  },
  {
    path: "/menu/viewCategories/Items/addItemsPage/:addItemsMenu/:addItems",
    name: "addItemsPage",
    component: addNewItemPageVue,
  },
  {
    path: "/menu/viewCategories/Items/deleteItemsPage/:deleteItemsMenu/:deleteItems/:delteItemId",
    name: "deleteItem",
    component: deleteItemVue,
  },
  {
    path: "/menu/viewCategories/Items/updateItemsPage/:updateItemsMenu/:updateItems/:updateItemId",
    name: "updateItem",
    component: UpdateItemPage,
  },
  {
    path: "/menu/viewCategories/Items/deleteAllItemsPage/:deleteItemsMenu/:deleteAllItems",
    name: "deleteAllItems",
    component: deleteAllItemPage,
  },
  {
    //i made location id to make dynamic url from params which found in userLocation component
    //:locationId for deleting the item by it's id
    path: "/deletePage/:locationId",
    name: "DeletePage",
    component: DeletePageVue,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/addlocation",
    name: "AddLocation",
    component: AddLocation,
  },
  {
    path: "/trashAllLocations",
    name: "TrashAllLocations",
    component: TrashAllLocationsVue,
  },

  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPageVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
