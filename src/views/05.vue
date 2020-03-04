<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js/build/stats.min';
import vShader from '../webgl/shaders/vertex/v-05.glsl';
import fShader from '../webgl/shaders/fragment/f-05.glsl';

import vDefault from '../webgl/shaders/vertex/v-default.glsl';
import fDefault from '../webgl/shaders/fragment/f-default.glsl';

const THREE = require('three');
const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'experiment-04',

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
    // Renders
    this.setRenderer();
    this.setSizes();

    // Objects
    this.createSphere();
    this.createBox();

    this.setUpEventListeners();

    // Misc
    if (!this.debug) return;
    this.showStats();
    this.showGUI();
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
      this.camera.position.set(10, 20, 50);

      this.controls = new OrbitControls(this.camera, this.$refs.canvas);
      this.controls.enablePan = false;
      this.controls.enableZoom = false;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.08;
      this.controls.rotateSpeed = 0.20;
      this.controls.update();
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

    createSphere() {
      const geometry = new THREE.SphereGeometry(5, 32, 32);

      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vShader,
        fragmentShader: fShader,
      });

      this.$data.sphere = new THREE.Mesh(geometry, material);
      this.scene.add(this.$data.sphere);
    },

    createBox() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vDefault,
        fragmentShader: fDefault,
      });

      this.$data.cube = new THREE.Mesh(geometry, material);

      this.$data.cube.position.x = 10;

      this.scene.add(this.$data.cube);
    },

    update() {
      // ANIMATION
    },

    render() {
      if (this.debug) this.$data.stats.begin();

      this.uniforms.u_time.value = this.clock.getElapsedTime();
      this.update();
      this.renderer.render(this.scene, this.camera);
      this.controls.update();

      if (this.debug) this.$data.stats.end();
    },

    showStats() {
      this.$data.stats = new Stats();
      this.$data.stats.showPanel(0);
      document.body.appendChild(this.$data.stats.dom);
    },

    showGUI() {
      const gui = new dat.GUI({ autoPlace: true });

      const cubeFolder = gui.addFolder('Cube');

      cubeFolder.add(this.$data.cube.position, 'x', 5, 15) //
        .name('Position')
        .onChange(this.render());

      cubeFolder.add(this.$data.cube.scale, 'x', 1, 5) //
        .name('Scale')
        .onChange(this.render());

      cubeFolder.add(this.$data.cube.scale, 'y', 1, 5) //
        .name('Scale')
        .onChange(this.render());

      cubeFolder.open();
    },

    /*
      Listeners
    */
    tickHandler() {
      gsap.ticker.add(this.render);
    },
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
