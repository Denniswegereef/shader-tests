<template>
  <div class='header'>
    <router-link class="header__link" to='/'>Back</router-link>
    <span class="header__text">Page: {{ $props.route.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    route: Object,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  z-index: 2;
  overflow: hidden;

  background: #000;

  text-transform: capitalize;
  text-align: center;

  transition: background 0.2s;

  &:hover {
    background: #333;

    .header__link {
      transform: translateY(100%);
    }

    .header__text {
      transform: translateY(100%);
    }
  }
}

.header__link {
  position: absolute;
  top: -100%;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  text-decoration: none;

  color: #fff;

  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.header__text {
  @include unselectable;

  display: inline-block;

  height: 100%;
  width: 100%;

  padding: 0.2rem 0.8rem;

  font-size: rem(16px);

  color: #fff;

  transition: transform 0.2s;
}
</style>
