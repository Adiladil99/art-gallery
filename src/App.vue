<template>
  <div class="main">
    <Header />
    <div class="main-router">
      <router-view class="main-view" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header.vue';

export default {
  components: { Header }
}

</script>

<style lang="scss">

.main {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  &-router {
    flex-grow: 1;
  }

}


#app {
  background: #F5F5F5;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: #FFFFFF;
}

::-webkit-scrollbar-thumb {
  background: #FFF200;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff316;
}


</style>
