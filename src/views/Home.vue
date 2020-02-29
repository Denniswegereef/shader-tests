<template>
  <div class='nav'>
    <router-link to='/'>Home</router-link>
    <router-link to='/default'>Default</router-link>
  </div>
</template>

<script>
export default {
  route: 'Home',
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
}
</style>
