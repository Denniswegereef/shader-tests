<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import Stats from 'stats.js/build/stats.min';

const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'canvas-01',

  components: {
    PageHeader,
  },

  data: () => ({
    debug: true,
    context: null,
    arrowX: 0,
    arrowY: 0,
    dimensionX: 0,
    dimensionY: 0,
    angle: 0,
  }),

  computed: {
    dimensions() {
      return {
        innerWidth: this.$store.getters.dimensions.innerWidth,
        innerHeight: this.$store.getters.dimensions.innerHeight,
      };
    },
  },

  watch: {
    dimensions() {
      this.setSizes();
    },
  },

  mounted() {
    this.$data.context = this.$refs.canvas.getContext('2d');

    // Misc
    if (this.debug) this.showStats();

    this.setSizes();
    this.setUpEventListeners();

    if (this.debug) this.showGUI();
  },

  methods: {
    setUpEventListeners() {
      this.tickHandler();
    },

    /*
      Functions
    */
    setSizes() {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.$refs.canvas.width = innerWidth;
      this.$refs.canvas.height = innerHeight;

      this.$data.arrowX = innerWidth / 2;
      this.$data.arrowY = innerHeight / 2;

      console.log(this.$data.arrowY);
    },

    update() {
      console.log('Update');

      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      // Create gradient
      const gradient = this.$data.context.createRadialGradient(75, 50, 5, 90, 60, innerHeight);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(1, 'white');

      // Fill with gradient
      this.$data.context.fillStyle = gradient;
      this.$data.context.fillRect(0, 0, innerWidth, innerHeight);
    },

    render() {
      if (this.debug) this.$data.stats.begin();

      this.update();

      if (this.debug) this.$data.stats.end();
    },

    showStats() {
      this.$data.stats = new Stats();
      this.$data.stats.showPanel(0);
      document.body.appendChild(this.$data.stats.dom).id = 'stats';
    },

    showGUI() {
      this.$data.gui = new dat.GUI({ autoPlace: true });

      const cubeFolder = this.$data.gui.addFolder('Canvas');

      // cubeFolder.add(this.$data.cube.position, 'x', 5, 15) //
      //   .name('Test')
      //   .onChange(this.render());

      cubeFolder.open();
    },

    /*
      Listeners
    */
    tickHandler() {
      gsap.ticker.add(this.render);
    },
  },

  beforeDestroy() {
    gsap.ticker.remove(this.render);

    if (this.debug) document.querySelector('#stats').remove();
    if (this.$data.gui) this.$data.gui.destroy();
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
