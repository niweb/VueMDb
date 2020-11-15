<template>
  <nav>
    <Navbar></Navbar>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/app/layout/Navbar.vue";

export default defineComponent({
  components: {
    Navbar
  }
});
</script>
