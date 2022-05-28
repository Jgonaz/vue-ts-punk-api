<template>
  <div>
    <h1>Bienvenido/a</h1>
    <span>
      Esto es una prueba de enrutamiento. Pulsa
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
