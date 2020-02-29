<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import vShader from '@/webgl/shaders/vertex/v-default.glsl';
import fShader from '@/webgl/shaders/fragment/f-default.glsl';

const THREE = require('three');
const { gsap } = require('gsap');

export default {
  name: 'Default',

  components: {
    PageHeader,
  },

  data: () => ({
    scene: new THREE.Scene(),
    camera: new THREE.OrthographicCamera(1, -1, 1, -1, 0.1, 10),
    renderer: null,
    uniforms: {
      u_color: { value: new THREE.Color(0x00ff00) },
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
      this.createTicker();
    },

    /*
      Functions
    */

    setSizes() {
      const { innerWidth, innerHeight } = this.$store.getters.dimensions;

      this.renderer.setSize(innerWidth, innerHeight);

      this.$refs.canvas.width = innerWidth;
      this.$refs.canvas.height = innerHeight;
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
    },

    /*
      Listeners
    */
    createTicker() {
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
