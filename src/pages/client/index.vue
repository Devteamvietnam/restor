<template>
  <div class="s__partnerships">
    <div class="partners__partner">
          <div class="text">
          <q-btn  class="button" type="a" href="https://youtube.com" target="_blank" label="AR DOWNLOAD" color="blue" />
          <h2 class="heading__l">Restorang AR</h2>
          <hr class="divider__r">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum asperiores error veniam, sed officia enim consequatur! Cumque, autem, consequuntur illo voluptatum impedit corporis repudiandae, neque temporibus dolorem placeat iusto. Distinctio</p>
          </div>
        <q-carousel
          animated
          v-model="slideVideo"
          navigation
          infinite
        >
         <q-carousel-slide :name="1">
        <q-video
          class="absolute-full"
          src="https://www.youtube.com/embed/rTM8vXtdIUA"
        />
        </q-carousel-slide>
        </q-carousel>
        </div>
      <div class="partners__partner">
        <div class="partner__image">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
        </q-carousel>
        </div>
        <div class="text">
          <h2 class="heading__l">Restorang Image</h2>
          <hr class="divider__r">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum asperiores error veniam, sed officia enim consequatur! Cumque, autem, consequuntur illo voluptatum impedit corporis repudiandae, neque temporibus dolorem placeat iusto. Distinctio.</p>
            <a class="button__r">
            <svg enable-background="new 0 0 30.99 6.99" viewBox="0 0 30.99 6.99" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <rect y="3" width="50" height="1"/>
              <polyline points="26.78 0.68 28.18 2.08 29.58 3.48 26.8 6.26 27.53 6.99 30.99 3.53 27.46 0"/>
            </svg>
            <span>Read More</span>
          </a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      slideVideo: 1,
      autoplay: true
    }
  }
}
</script>

<style src="../../css/ARmenu/index.css" scoped>
</style>
