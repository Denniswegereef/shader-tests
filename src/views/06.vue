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
    sun: {
      scale: 0.2,
    },
    mouse: {
      oldX: 0,
      oldY: 0,
      newX: 0,
      newY: 0,
    },
    uniforms: {
      u_color: { value: new THREE.Color(0xFFDFD3) },
      u_time: { value: 0.0 },
      u_scale: { value: 0.3 },
      u_grow: { value: -0.5 },
      u_mouse: { value: { x: 0.0, y: 0.0 } },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
      u_colors: { value: { r: 1.0, g: 0.8, b: 0.6 } },
      u_intensity: { value: 0.7 },
      u_bounce: { value: 0.3 },
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

      this.$data.mouse.newX = ((e.clientX / innerWidth) * 2) - 1;
      this.$data.mouse.newY = ((e.clientY / innerHeight) * 2) - 1;
    },

    updateMousePosition() {
      this.$data.mouse.oldX = this.uniforms.u_mouse.value.x;
      this.$data.mouse.oldY = this.uniforms.u_mouse.value.y;

      this.uniforms.u_mouse.value.x = this.lerp(this.$data.mouse.oldX, this.$data.mouse.newX, 0.07);
      this.uniforms.u_mouse.value.y = this.lerp(this.$data.mouse.oldY, this.$data.mouse.newY, 0.07);
    },

    update() {
      this.updateMousePosition();
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

      const sunFolder = this.$data.gui.addFolder('Sun');

      sunFolder.add(this.$data.uniforms.u_scale, 'value', 0.01, 5) //
        .name('Scale')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_colors.value, 'r', 0.0, 1.0) //
        .name('Red')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_colors.value, 'g', 0.0, 1.0) //
        .name('Red')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_colors.value, 'b', 0.0, 1.0) //
        .name('Green')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_grow, 'value', -1.0, 1.0) //
        .name('Grow')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_intensity, 'value', -3.0, 3.0) //
        .name('Intensity')
        .onChange(this.render());

      sunFolder.add(this.$data.uniforms.u_bounce, 'value', -5.0, 5.0) //
        .name('Bounce')
        .onChange(this.render());

      sunFolder.open();
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
