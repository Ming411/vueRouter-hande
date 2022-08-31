<template>
  <div class="container">
    <router-link to="/">a</router-link>
    <router-link to="/bpage">b</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import aPage from './components/aPage.vue';
// import bPage from './components/bPage.vue';
export default {
  // components: {aPage, bPage}
  // props: {
  //   whyccc: {
  //     type: String
  //   }
  // },
  mounted() {
    // console.log(this);
  }
};
</script>

<style></style>
