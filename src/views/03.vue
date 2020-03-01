<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import vShader from '../webgl/shaders/vertex/v-03.glsl';
import fShader from '../webgl/shaders/fragment/f-03.glsl';

const THREE = require('three');
const { gsap } = require('gsap');

export default {
  name: 'experiment-03',

  components: {
    PageHeader,
  },

  data: () => ({
    scene: new THREE.Scene(),
    camera: new THREE.OrthographicCamera(1, -1, 1, -1, 0.1, 10),
    renderer: null,
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
    this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas });
    this.camera.position.z = 1;
    this.renderer.setClearColor(0xadd8e6, 1);

    this.setSizes();
    this.createPlane();

    this.setUpEventListeners();
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

    render() {
      this.renderer.render(this.scene, this.camera);

      this.uniforms.u_time.value = this.clock.getElapsedTime();
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
