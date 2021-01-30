<script>
import { defineComponent } from 'vue'

/** Component can be used to render route children without displaying anything */
export default defineComponent({
  name: 'EmptyRouterView',
})
</script>

<template>
  <router-view></router-view>
</template>
