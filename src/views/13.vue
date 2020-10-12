<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import Stats from 'stats.js/build/stats.min';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk';

import vShader from '../webgl/shaders/vertex/v-13.glsl';
import fShader from '../webgl/shaders/fragment/f-13.glsl';

const THREE = require('three');
const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'experiment-13',

  components: {
    PageHeader,
  },

  data: () => ({
    scene: new THREE.Scene(),
    clock: new THREE.Clock(),
    debug: true,
    ball: null,
    camera: null,
    renderer: null,
    controls: null,
    uniforms: {
      u_duration: { value: 8.0 },
      u_time: { value: 0.0 },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
      u_radius: { value: 20.0 },
      u_tex: { value: '' },
      u_color: { value: new THREE.Color(0xb7ff00) },
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
    // console.log(ShaderChunk);
    // Misc
    if (this.debug) this.showStats();

    // Renders
    this.setRenderer();
    this.setSizes();

    // Objects
    this.createIcosahedronGeometry();

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
      this.renderer.setClearColor(0x252525, 1);

      this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 1, 1000);
      this.camera.position.z = 100;

      this.initOrbitCamera();
    },

    initOrbitCamera() {
      this.controls = new OrbitControls(this.camera, this.$refs.canvas);
      this.controls.minAzimuthAngle = 0;
      this.controls.maxAzimuthAngle = Math.PI * 0.5;
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

    createIcosahedronGeometry() {
      const geometry = new THREE.IcosahedronGeometry(20, 4);

      const textureLoader = new THREE.TextureLoader();
      const path = require('@/assets/explosion.png');
      const loadTexture = textureLoader.load(path);

      this.$data.uniforms.u_tex.value = loadTexture;

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: vShader,
        fragmentShader: fShader,
        side: THREE.DoubleSide,
      });

      this.sphere = new THREE.Mesh(geometry, shaderMaterial);

      this.scene.add(this.sphere);
    },

    update() {
      this.sphere.rotation.x += 0.04;
      this.sphere.rotation.y += 0.02;
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
