<template>
  <div class="details">
    <img
      src="@/assets/images/beer_logo.png"
      width="64"
      height="64"
      alt="beer_logo"
    />
    <span>{{ beer.name }}</span>
    <span>{{ beer.description }}</span>
    <span>{{ beer.tagline }}</span>
    <span>{{ beer.abv }}</span>
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
});
</script>
