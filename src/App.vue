<template>
  <div id="app">
    <headerContent />
    <router-view />
  </div>
</template>

<script>
import headerContent from "@/components/HeaderContent.vue";
export default {
  name: "allPages",
  posts: [],
  components: {
    headerContent,
  },
};
</script>
<style lang="scss" scoped></style>
