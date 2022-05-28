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
          <h3 class="grid-item_title" @click="beerDetails(beer.id)">
            {{ beer.name }}
          </h3>
        </div>
      </div>
    </div>
    <VueModal v-model="showModal" :close="closeModal">
      <div class="modal modal-details">
        <img
          src="@/assets/images/beer_logo.png"
          width="64"
          height="64"
          alt="beer_logo"
        />
        <h3>{{ itemSelected.name }}</h3>
        <button @click="closeModal">Cerrar</button>
      </div>
    </VueModal>
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
