<template>
  <HeaderVue />
  <deleteItemVue />
</template>
<script>
import HeaderVue from "@/components/Header/Header.vue";
import deleteItemVue from "@/components/ItemsOfCategories/deleteItem.vue";
export default {
  name: "deleteItemComp",
  components: {
    HeaderVue,
    deleteItemVue,
  },
};
</script>
