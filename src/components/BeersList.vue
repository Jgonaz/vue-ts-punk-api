<template>
  <div>
    <div>
      <h1>Listado de cervezas.</h1>
    </div>
    <div class="search">
      <input type="text" v-model="filter" />
    </div>
    <div v-if="errMsg" class="error-msg">
      <span> {{ errMsg }} </span>
    </div>
    <div v-else class="grid">
      <div v-for="(beer, index) in beers" v-bind:key="index">
        <div class="grid-item" :id="'beer_' + beer.id">
          <h3 class="grid-item_title">{{ beer.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Beer from "@/types/Beer";
import BeersDataService from "@/services/BeersDataService";

export default defineComponent({
  name: "BeersList",
  data() {
    return {
      beers: [] as Beer[],
      filter: "" as string,
      errMsg: "" as string,
    };
  },
  methods: {
    getBeers() {
      this.errMsg = "";
      this.beers = [];

      BeersDataService.getAll()
        .then((response) => {
          debugger;
          if (response?.data) this.beers = response.data;
          else this.errMsg = "Error al intentar obtener los datos.";
        })
        .catch((err) => {
          console.error(err);
          this.errMsg = "Error al intentar obtener los datos.";
        });
    },
  },
  mounted() {
    this.getBeers();
  },
});
</script>
