<template>
  <div>
    <nav class="navbar">
      <div class="navbar-logo">
        <img
          src="@/assets/images/beer_logo.png"
          alt="beer_logo"
          width="40"
          height="40"
        />
      </div>
      <ul>
        <li>
          <router-link to="/index" class="navbar-brand">Inicio</router-link>
        </li>
        <li>
          <router-link to="/beers" class="nav-link">Listado</router-link>
        </li>
      </ul>
      <div class="navbar-contact">
        <a
          href="https://www.linkedin.com/in/jgonzalez-azpillaga/"
          target="_blank"
          ><ico class="navbar-contact_icon"></ico>
          <span class="navbar-contact_name">Jorge González</span></a
        >
      </div>
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
</style>
