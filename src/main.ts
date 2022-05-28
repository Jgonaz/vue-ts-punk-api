import { createApp } from "vue";
import "vue-universal-modal/dist/index.css";
import VueUniversalModal from "vue-universal-modal";
import App from "./App.vue";
import router from "@/router";

// App
const app = createApp(App);
// Router
app.use(router);
// Componente modal
app.use(VueUniversalModal, {
  teleportTarget: "#modals",
  modalComponent: "VueModal",
});
// Mount
app.mount("#app");
