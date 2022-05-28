<template>
  <div>
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
    <!-- Componente modales -->
    <div id="modals"></div>
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
@import "@/styles/modal";
@import "@/styles/variables";
</style>
