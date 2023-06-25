<template>
  <Header />
  <MenueComponent />
</template>
<script>
import MenueComponent from "@/components/CategoriesMenu/menu.vue";
import Header from "@/components/Header/Header.vue";
export default {
  name: "menuePage",
  components: {
    MenueComponent,
    Header,
  },
};
</script>
