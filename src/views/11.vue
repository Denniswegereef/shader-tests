<template>
  <div class="default">
    <PageHeader :route='this.$route' />
    <canvas class="canvas" ref="canvas"></canvas>
    <div @click="buttonBackHandler" class="button button__back"></div>
    <div @click="buttonForwardHandler" class="button button__forward"></div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

import Stats from 'stats.js/build/stats.min';
import mod from '../helpers/mod';

import vShader from '../webgl/shaders/vertex/v-11.glsl';
import fShader from '../webgl/shaders/fragment/f-11.glsl';

const THREE = require('three');
const { gsap } = require('gsap');
const dat = require('dat.gui');

export default {
  name: 'experiment-11',

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
    slider: {
      index: 0,
      images: [],
      aspectRatio: {
        width: 130,
        height: 87,
      },
      scaleRatioPercent: 190,
    },
    uniforms: {
      u_duration: { value: 8.0 },
      u_tex_1: { value: '' },
      u_tex_2: { value: '' },
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
      this.renderer.setClearColor(0x252525, 1);

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
      const ratio = this.slider.scaleRatioPercent;
      const geometry = new THREE.PlaneGeometry(this.slider.aspectRatio.width / ratio, this.slider.aspectRatio.height / ratio);
      // const textureLoader = new THREE.TextureLoader();

      this.slider.images = [
        require('@/assets/texture_two.png'),
        require('@/assets/texture_three.png'),
        require('@/assets/texture_four.png'),
      ];

      console.log(this.slider.images);

      // const loadTexture = textureLoader.load(path);

      // this.$data.uniforms.u_tex.value = loadTexture;

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

    sliderBack() {
      this.slider.index -= 1;
      const { length } = this.slider.images;

      if (this.slider.index <= -1) this.slider.index = length - 1;

      this.uniforms.u_tex_1 = this.slider.images[mod(this.slider.index - 1, length)];
      this.uniforms.u_tex_2 = this.slider.images[this.slider.index];
    },

    sliderForward() {
      this.slider.index += 1;
      const { length } = this.slider.images;

      if (this.slider.index === this.slider.images.length) this.slider.index = 0;

      this.uniforms.u_tex_1 = this.slider.images[this.slider.index];
      this.uniforms.u_tex_2 = this.slider.images[mod(this.slider.index + 1, length)];
    },

    updateSliderIndex() {
      console.log(this.uniforms.u_tex_1);
      console.log(this.uniforms.u_tex_2);

      console.log(this.slider.index);
      console.log('------');
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

    buttonBackHandler() {
      this.sliderBack();
      this.updateSliderIndex();
    },

    buttonForwardHandler() {
      this.sliderForward();
      this.updateSliderIndex();
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

.button {
  position: absolute;
  bottom: 5vh;

  height: 5px;
  width: 20px;

  background: #FAF0E6;

  opacity: 0.2;
  z-index: 5;
  transition: opacity 0.3s;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: -22px;

    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-left: 50px solid #FAF0E6;
    border-bottom: 25px solid transparent;
  }

  &__back {
    left: 47vw;

    &:before {
      left: -30px;
      transform: scale(0.3) rotate(180deg);
    }
  }

  &__forward {
    right: 47vw;

    &:before {
      right: -30px;
      transform: scale(0.3);
    }
  }

  &:hover {
    opacity: 0.7;
  }
}
</style>
