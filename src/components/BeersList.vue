<template>
  <div class="list">
    <div class="list_header">
      <h3>Listado de cervezas</h3>
      <div class="list_header-search">
        <input
          v-model="filter"
          placeholder="Filtrar por nombre"
          @input="getBeersByName()"
          type="text"
        />
      </div>
    </div>
    <hr />
    <div class="list_grid" v-if="beers.length">
      <div class="list_grid-header">
        <span>Nombre</span>
        <span>Eslogan</span>
        <span>Fecha</span>
        <span>Volumen</span>
        <span></span>
      </div>
      <div
        v-for="(beer, index) in beers"
        v-bind:key="index"
        class="list_grid-row"
        :id="'beer_' + beer.id"
      >
        <span>{{ beer.name }}</span>
        <span>{{ beer.tagline }}</span>
        <span>{{ beer.first_brewed }}</span>
        <span>{{ beer.abv }}%</span>
        <span @click="beerDetails(beer.id)">Ver detalles</span>
      </div>
    </div>
    <div class="list_no-results" v-else>
      <span> {{ errMsg || "No se han encontrado resultados." }} </span>
    </div>

    <VueModal v-model="showModal" :close="closeModal">
      <div class="modal modal-details">
        <BeerDetails v-if="itemSelected" :beer="itemSelected"></BeerDetails>
        <button @click="closeModal">Cerrar</button>
      </div>
    </VueModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Beer from "@/types/Beer";
import BeersDataService from "@/services/BeersDataService";
import BeerDetails from "@/components/BeerDetails.vue";

export default defineComponent({
  name: "BeersList",
  components: {
    BeerDetails,
  },
  data() {
    return {
      beers: [] as Beer[], // Array de cervezas
      itemSelected: {} as Beer, // Cerveza seleccionada
      filter: "" as string, // Filtro por nombre
      errMsg: "" as string, // Mensaje de error
      showModal: false as boolean, // Mostrar/ocultar modal
    };
  },
  methods: {
    // Obtiene el listado de cervezas.
    getBeers() {
      this.errMsg = "";

      BeersDataService.getAll()
        .then((response) => {
          console.log({ response });
          this.beers = [];
          if (response?.data) this.beers = response.data;
          else this.errMsg = "Error al intentar obtener los datos.";
        })
        .catch((err) => {
          console.error(err);
          this.beers = [];
          this.errMsg = "Error al intentar obtener los datos.";
        });
    },
    // Obtiene listado de cervezas filtrado por nombre.
    getBeersByName() {
      this.errMsg = "";

      if (!this.filter) this.getBeers();
      else
        BeersDataService.getByName(this.filter)
          .then((response) => {
            console.log({ response });
            this.beers = [];
            if (response?.data) this.beers = response.data;
            else this.errMsg = "Error al intentar obtener los datos.";
          })
          .catch((err) => {
            console.error(err);
            this.beers = [];
            this.errMsg = "Error al intentar obtener los datos.";
          });
    },
    // Muestra la modal con los detalles de la cerveza seleccionada.
    beerDetails(id: number) {
      this.showModal = true;
      this.itemSelected = this.beers.filter((beer) => beer.id === id)[0];
    },
    // Oculta la modal.
    closeModal() {
      this.showModal = false;
    },
  },
  mounted() {
    // Al montar el componente llamamos al listado.
    this.getBeers();
  },
});
</script>
