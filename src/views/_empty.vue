<template>
  <div class="empty">
    <h1>Empty page</h1>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import vertexShader from '../webgl/shaders/vertex/v-1.glsl';

const THREE = require('three');
const { gsap } = require('gsap');

export default {
  name: 'Empty',
  data: () => ({
    scene: new THREE.Scene(),
    camera: new THREE.OrthographicCamera(1, -1, 1, -1, 0.1, 10),
    renderer: null,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }),
  mounted() {
    console.log(vertexShader);

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
      this.renderer.setSize(this.innerWidth, this.innerHeight);

      this.$refs.canvas.width = this.innerWidth;
      this.$refs.canvas.height = this.innerHeight;
    },
    createPlane() {
      const geometry = new THREE.PlaneGeometry(1.8, 1.8);
      // const material = new THREE.ShaderMaterial();
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

      const plane = new THREE.Mesh(geometry, material);

      this.scene.add(plane);
    },
    createCube() {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.$data.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.$data.cube);
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
