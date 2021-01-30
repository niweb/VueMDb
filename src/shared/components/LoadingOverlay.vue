<script lang="ts">
import { defineComponent } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

export default defineComponent({
  components: {
    ProgressSpinner,
  },

  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <ProgressSpinner v-if="active"></ProgressSpinner>
  <template v-else>
    <slot></slot>
  </template>
</template>
