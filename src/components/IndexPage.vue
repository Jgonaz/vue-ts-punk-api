<template>
  <div>
    <h3>¡Hola! 🙋‍♂️</h3>
    <div>
      <span>
        Esto es un proyecto de prueba realizado sobre
        <a href="https://punkapi.com/documentation/v2" target="_blank"
          >Punk API</a
        >
        utilizando Vue3, TypeScript, Vue-Router y Axios.
      </span>
    </div>
    <hr />
    <div>
      <span
        >Pulse <router-link to="/beers">aquí</router-link> para acceder al
        listado de cervezas.
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
