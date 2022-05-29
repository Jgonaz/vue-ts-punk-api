<template>
  <div class="list">
    <div>
      <h3>Listado de cervezas</h3>
    </div>
    <div class="search">
      <input type="text" v-model="filter" />
    </div>
    <div v-if="errMsg" class="error-msg">
      <span> {{ errMsg }} </span>
    </div>
    <div v-else>
      <div class="grid grid-header">
        <span class="grid-item">Nombre</span>
        <span class="grid-item">Eslogan</span>
        <span class="grid-item">Fecha de elaboración</span>
        <span class="grid-item">Volumen</span> <span class="grid-item"></span>
      </div>
      <div
        v-for="(beer, index) in beers"
        v-bind:key="index"
        class="grid grid-body"
        :id="'beer_' + beer.id"
      >
        <span class="grid-item">
          {{ beer.name }}
        </span>
        <span class="grid-item">
          {{ beer.tagline }}
        </span>
        <span class="grid-item">
          {{ beer.first_brewed }}
        </span>
        <span class="grid-item">
          {{ beer.abv }}
        </span>
        <span class="grid-item grid-item-details" @click="beerDetails(beer.id)">
          Ver detalles
        </span>
      </div>
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
      this.beers = [];

      BeersDataService.getAll()
        .then((response) => {
          if (response?.data) this.beers = response.data;
          else this.errMsg = "Error al intentar obtener los datos.";
        })
        .catch((err) => {
          console.error(err);
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
