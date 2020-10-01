<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import Stats from 'stats.js/build/stats.min';

import vShader from '../webgl/shaders/vertex/v-09.glsl';
import fShader from '../webgl/shaders/fragment/f-09.glsl';

const THREE = require('three');
const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'experiment-09',

  components: {
    PageHeader,
  },

  data: () => ({
    scene: new THREE.Scene(),
    clock: new THREE.Clock(),
    debug: true,
    camera: null,
    renderer: null,
    controls: null,
    uniforms: {
      u_tex: { value: '' },
      u_time: { value: 0.0 },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
      u_color_a: { value: new THREE.Color(0xff0000) },
      u_color_b: { value: new THREE.Color(0xffff00) },
    },
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
    // Misc
    if (this.debug) this.showStats();

    // Renders
    this.setRenderer();
    this.setSizes();

    // Objects
    this.createPlane();

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
    setRenderer() {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas });
      this.renderer.setClearColor(0x333333, 1);

      this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 1000);
      this.camera.position.z = 1;
    },

    setSizes() {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.$refs.canvas.width = innerWidth;
      this.$refs.canvas.height = innerHeight;

      this.uniforms.u_resolution.value.x = innerWidth;
      this.uniforms.u_resolution.value.y = innerHeight;

      this.renderer.setSize(innerWidth, innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
    },

    createPlane() {
      const geometry = new THREE.PlaneGeometry(329 / 400, 251 / 400);
      const textureLoader = new THREE.TextureLoader();
      const path = require('@/assets/texture_one.png');
      const loadTexture = textureLoader.load(path);

      this.$data.uniforms.u_tex.value = loadTexture;

      // const texture = this.$data.textureLoader;

      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vShader,
        fragmentShader: fShader,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, material);

      this.scene.add(plane);
    },

    update() {
      // this.updateMousePosition();
      // ANIMATION
      // END ANIMATION
    },

    render() {
      if (this.debug) this.$data.stats.begin();

      this.uniforms.u_time.value = this.clock.getElapsedTime();

      this.update();

      this.renderer.render(this.scene, this.camera);

      if (this.debug) this.$data.stats.end();
    },

    showStats() {
      this.$data.stats = new Stats();
      this.$data.stats.showPanel(0);
      document.body.appendChild(this.$data.stats.dom).id = 'stats';
    },

    showGUI() {
      this.$data.gui = new dat.GUI({ autoPlace: true });

      const folder = this.$data.gui.addFolder('GUI');

      folder.open();
    },

    /*
      Listeners
    */
    tickHandler() {
      gsap.ticker.add(this.render);
    },

    /*
      Helpers
    */
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
  },

  beforeDestroy() {
    gsap.ticker.remove(this.render);
    window.removeEventListener('mousemove', this.changeMousePosition);

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
