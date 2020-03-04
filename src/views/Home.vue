<template>
  <div class='home'>
    <ul class="home__list">
      <li v-for="item in routes" :key="item.path" class="home__item">
        <router-link :to='item.path' class="home__link">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  route: 'Home',
  data: () => ({
    routes: [
      {
        name: 'Default',
        path: '/default',
      },
      {
        name: 'Mouse color movement',
        path: '/01',
      },
      {
        name: 'Mouse blending colors',
        path: '/02',
      },
      {
        name: 'Blending colors',
        path: '/03',
      },
      {
        name: 'Moving spheres',
        path: '/04',
      },
      {
        name: 'Displacement sphere',
        path: '/05',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.home__list {
  display: flex;
  flex-direction: column;

  padding: rem(100px);
}

.home__item {
  margin-bottom: rem(10px);
}

.home__link {
  text-decoration: none;
}
</style>
