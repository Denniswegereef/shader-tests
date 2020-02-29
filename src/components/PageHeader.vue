<template>
  <div class='title'>Page: {{ $props.route.name }}</div>
</template>

<script>
export default {
  props: {
    route: Object,
  },
  mounted() {
    console.log(this.$props.route.name);
  },
};
</script>

<style lang="scss" scoped>
.title {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  z-index: 2;

  padding: 0.2rem 0.8rem;

  background: #000;
  color: #fff;

  text-transform: capitalize;
}
</style>
