<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vShader from '../webgl/shaders/vertex/v-04.glsl';
import fShader from '../webgl/shaders/fragment/f-04.glsl';

const THREE = require('three');
const { gsap } = require('gsap');


export default {
  name: 'experiment-04',

  components: {
    PageHeader,
  },

  data: () => ({
    scene: new THREE.Scene(),
    camera: null,
    renderer: null,
    controls: null,
    clock: new THREE.Clock(),
    uniforms: {
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
    this.setRenderer();
    this.setSizes();
    this.createSpheres();

    this.setUpEventListeners();
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

      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas, antialias: true });
      this.renderer.setClearColor(0x333333, 1);

      this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 10000);
      this.controls = new OrbitControls(this.camera, this.$refs.canvas);

      this.camera.position.set(10, 20, 150);
      this.controls.update();
    },

    setSizes() {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.renderer.setSize(innerWidth, innerHeight);

      this.$refs.canvas.width = innerWidth;
      this.$refs.canvas.height = innerHeight;

      this.uniforms.u_resolution.value.x = innerWidth;
      this.uniforms.u_resolution.value.y = innerHeight;
    },

    createPlane() {
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

    createSpheres() {
      const sphereAmount = 5;
      this.$data.sphereArray = [];

      for (let i = 0; i < sphereAmount; i++) {
        const geometry = new THREE.SphereGeometry(10, 30, 30);

        const material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: vShader,
          fragmentShader: fShader,
        });

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.z = 0;
        sphere.position.y = -50 + (i * 25);
        this.scene.add(sphere);

        this.$data.sphereArray.push(sphere);
      }
    },

    render() {
      this.controls.update();
      this.uniforms.u_time.value = this.clock.getElapsedTime();

      for (let i = 0; i < this.$data.sphereArray.length; i++) {
        const sphere = this.$data.sphereArray[i];

        sphere.rotation.x += (i + 1) / 100;
        sphere.rotation.y += (i + 1) / 100;
        sphere.position.x = Math.cos(this.uniforms.u_time.value / (i + 1 * 0.5)) * 20;
      }
      this.renderer.render(this.scene, this.camera);
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
