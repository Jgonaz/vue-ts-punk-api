<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/index" class="navbar-brand">Inicio</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/beers" class="nav-link">Cervezas</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
