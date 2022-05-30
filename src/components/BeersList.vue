<template>
  <div class="list">
    <div class="list_header">
      <h3 class="list_header-title">Listado de cervezas</h3>
      <div class="list_header-search">
        <input
          v-model="filter"
          placeholder="Filtrar por nombre"
          @input="getBeersByName(true)"
          type="text"
        />
      </div>
    </div>
    <hr />
    <div class="list_grid" v-if="!errMsg">
      <!-- Cabecera tabla -->
      <div class="list_grid-header">
        <span>Nombre</span>
        <span>Eslogan</span>
        <span>Fecha</span>
        <span>Volumen</span>
        <span></span>
      </div>
      <!-- Resultados -->
      <div>
        <div
          v-for="(beer, index) in beers"
          v-bind:key="index"
          class="list_grid-row"
          :id="'beer_' + beer.id"
        >
          <div>
            <span>{{ beer.name }}</span>
          </div>
          <div>
            <span>{{ beer.tagline }}</span>
          </div>
          <div>
            <span>{{ beer.first_brewed }}</span>
          </div>
          <div>
            <span>{{ beer.abv }}%</span>
          </div>
          <div>
            <span @click="beerDetails(beer.id)">
              <i class="eye-icon" />
              Detalles
            </span>
          </div>
        </div>
      </div>
      <div v-if="!beers.length" class="list_grid-no_results">
        <span>No hay más resultados con los criterios de búsqueda.</span>
      </div>
      <!-- Paginación -->
      <div class="list_grid-pagination">
        <a
          href="javascript:void(0)"
          v-bind:class="{ hidden: active_page === 1 }"
          @click="goToPage(false)"
          >Página<br />anterior</a
        >
        <div>{{ active_page }}</div>
        <a
          href="javascript:void(0)"
          v-bind:class="{
            hidden: beers.length === 0 || beers.length < per_page,
          }"
          @click="goToPage(true)"
          >Página<br />siguiente</a
        >
      </div>
    </div>
    <div class="list_error-msg" v-if="errMsg">
      <span> {{ errMsg }} </span>
    </div>

    <VueModal v-model="showModal" :close="closeModal">
      <div class="modal">
        <span class="modal-close" title="Cerrar" @click="closeModal"></span>
        <BeerDetails v-if="itemSelected" :beer="itemSelected"></BeerDetails>
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
      active_page: 1, // Página actual
      per_page: 5, // Número de registros por página (máximo 80)
    };
  },
  methods: {
    // Obtiene el listado de cervezas.
    getBeers() {
      this.errMsg = "";

      BeersDataService.getAll(this.active_page, this.per_page)
        .then((response) => {
          console.log({ response });

          if (response?.data) {
            this.beers = response.data;
          } else this.handleError();
        })
        .catch((err) => {
          this.handleError(err);
        });
    },
    // Obtiene listado de cervezas filtrado por nombre.
    getBeersByName(input: boolean) {
      this.errMsg = "";

      // Si viene de modificar el cuadro de búsqueda, reiniciaremos la paginación.
      if (input) this.active_page = 1;

      if (!this.filter) this.getBeers();
      else
        BeersDataService.getByName(this.filter, this.active_page, this.per_page)
          .then((response) => {
            console.log({ response });

            if (response?.data) {
              this.beers = response.data;
            } else this.handleError();
          })
          .catch((err) => {
            this.handleError(err);
          });
    },
    // Muestra la modal con los detalles de la cerveza seleccionada.
    beerDetails(id: number) {
      this.showModal = true;
      this.itemSelected = this.beers.filter((beer) => beer.id === id)[0];
    },
    // Cambia de página en el listado.
    goToPage(next: boolean) {
      if (next) this.active_page++;
      else this.active_page--;

      if (!this.filter) this.getBeers();
      else this.getBeersByName(false);
    },
    // Oculta la modal.
    closeModal() {
      this.showModal = false;
    },
    // Cuando ocurre algún error al intentar obtener los datos.
    handleError(error = "Error al intentar obtener los datos.") {
      console.error(error);
      this.errMsg = error;
      this.beers = [];
    },
  },
  mounted() {
    // Al montar el componente llamamos al listado.
    this.getBeers();
  },
});
</script>
