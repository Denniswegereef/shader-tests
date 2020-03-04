<template>
  <div id="app" ref="app">
    <router-view />
  </div>
</template>

<script>
const debounce = require('lodash.debounce');

export default {
  mounted() {
    this.setViewportDimensions();
    this.setUpEventListeners();
  },
  methods: {
    setUpEventListeners() {
      this.resizeHandler();
    },

    /*
      Functions
    */
    setViewportDimensions() {
      /*
      !?!?!??!?!?!?!?!??!?!
      this.$refs.app.style.minHeight = height + 'px';
      !?!?!??!?!?!?!?!??!?!
      */

      this.$store.commit('dimensions', {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    },

    /*
      Listeners
    */

    resizeHandler() {
      window.addEventListener('resize', debounce(this.setViewportDimensions.bind(this), 250));
    },
  },
};
</script>

<style lang="scss">
@import '@/_scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  min-height: 100vh;

  background: #333;

  color: #fff;
}
</style>
