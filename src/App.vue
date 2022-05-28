<template>
  <nav class="navbar">
    <ul>
      <li>
        <router-link to="/index" class="navbar-brand">Inicio</router-link>
      </li>
      <li>
        <router-link to="/beers" class="nav-link">Listado</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
@import "@/styles/main";
</style>
