<template>
  <div class='nav'>
    <router-link to='/default'>Default</router-link>
    <router-link to='/01'>Mouse movement</router-link>
    <router-link to='/02'>Blending colors</router-link>
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
