<template>
  <div class='nav'>
    <router-link to='/'>Home</router-link>
    <router-link to='/empty'>Empty</router-link>
    <router-link to='/canvas/1'>Canvas 1</router-link>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWo3rld from "@/components/HelloWorld.vue";

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
}
</style>
