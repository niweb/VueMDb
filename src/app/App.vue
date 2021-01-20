<template>
  <nav>
    <Navbar></Navbar>
  </nav>
  <main class="p-component">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/app/layout/Navbar.vue'

export default defineComponent({
  components: {
    Navbar,
  },
})
</script>

<style lang="stylus">
#app
  font-family 'Source Sans Pro', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
