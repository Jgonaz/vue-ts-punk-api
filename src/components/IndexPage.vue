<template>
  <div>
    <h3>Bienvenido/a</h3>
    <span>
      Esto es una prueba de enrutamiento con vue-router. Pulsa
      <router-link to="/beers">aquí</router-link> para acceder al listado de
      cervezas.
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
