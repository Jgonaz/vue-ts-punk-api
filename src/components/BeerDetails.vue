<template>
  <div>
    <h4 class="modal-title">{{ beer.name }}</h4>
    <div class="modal-img">
      <img :src="beer.image_url" alt="beer_logo" />
    </div>
    <div class="modal-tagline">
      <span>{{ beer.tagline }}</span>
    </div>
    <div class="modal-nav_bar">
      <div
        class="modal-nav_bar-item"
        @click="activeNav = 1"
        v-bind:class="{ 'active-nav': activeNav == 1 }"
      >
        Descripción
      </div>
      <div
        @click="activeNav = 2"
        class="modal-nav_bar-item"
        v-bind:class="{ 'active-nav': activeNav == 2 }"
      >
        Datos
      </div>
      <div
        @click="activeNav = 3"
        class="modal-nav_bar-item"
        v-bind:class="{ 'active-nav': activeNav == 3 }"
      >
        Consejos
      </div>
    </div>
    <div class="modal-nav_content">
      <div
        class="modal-nav_content-wrapper"
        v-bind:class="{
          'active-description': activeNav == 1,
          'active-data': activeNav == 2,
          'active-tips': activeNav == 3,
        }"
      >
        <div>
          <span>{{ beer.description }}</span>
        </div>
        <div>
          <div>
            <span>Fecha de elaboración: {{ beer.first_brewed }}</span>
          </div>
          <div>
            <span>Alcohol por volumen: {{ beer.abv }}%</span>
          </div>
          <div>
            <span>Grado de amargor: {{ beer.ibu }}%</span>
          </div>
          <div>
            <span>Grado de acidez: {{ beer.ph }}%</span>
          </div>
          <div>
            <span>Grado de atenuación: {{ beer.attenuation_level }}%</span>
          </div>
        </div>
        <div>
          <span>{{ beer.brewers_tips }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Beer from "@/types/Beer";

export default defineComponent({
  name: "BeerDetails",
  props: {
    beer: { required: true, type: Object as () => Beer },
  },
  data() {
    return {
      activeNav: 1, // 2 | 3
    };
  },
});
</script>
