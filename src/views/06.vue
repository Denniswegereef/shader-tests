<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import Stats from 'stats.js/build/stats.min';

import vShader from '../webgl/shaders/vertex/v-06.glsl';
import fShader from '../webgl/shaders/fragment/f-06.glsl';

const THREE = require('three');
const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'experiment-06',

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
      u_color: { value: new THREE.Color(0xFFDFD3) },
      u_time: { value: 0.0 },
      u_mouse: { value: { x: 0.0, y: 0.0 } },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
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
      this.mousemoveHandler();
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
      console.log('create');
      const geometry = new THREE.PlaneGeometry(2, 2);

      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vShader,
        fragmentShader: fShader,
        side: THREE.DoubleSide,
      });

      const plane = new THREE.Mesh(geometry, material);

      this.scene.add(plane);
    },

    changeMousePosition(e) {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.uniforms.u_mouse.value.x = ((e.clientX / innerWidth) * 2) - 1;
      this.uniforms.u_mouse.value.y = ((e.clientY / innerHeight) * 2) - 1;

      console.log(`x:${this.uniforms.u_mouse.value.x} y:${this.uniforms.u_mouse.value.y}`);
    },

    update() {
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

      const cubeFolder = this.$data.gui.addFolder('Cube');

      cubeFolder.open();
    },

    /*
      Listeners
    */
    tickHandler() {
      gsap.ticker.add(this.render);
    },

    mousemoveHandler() {
      window.addEventListener('mousemove', this.changeMousePosition);
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
