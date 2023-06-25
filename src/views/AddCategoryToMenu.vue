<template>
  <Header />
  <AddMenueCategory />
</template>
<script>
import AddMenueCategory from "@/components/CategoriesMenu/AddMenueCategory.vue";
import Header from "@/components/Header/Header.vue";
export default {
  name: "AddcategoryTomenu",
  components: {
    AddMenueCategory,
    Header,
  },
};
</script>
