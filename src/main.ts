import { createPinia } from "pinia";
import { createApp } from "vue";
import initializeFirebase from "~/firebase/initialization";
import authenticateUser from "~/firebase/authentication";
import App from "./App.vue";
import useRootStore from "~/store/root";
import { Auth } from "firebase/auth";

initializeFirebase();
const user = await authenticateUser();

const app = createApp(App);
app.use(createPinia());
app.mount("#app");

if (user) {
  // TODO [ozlui] this store initialization breaks the Devtools. Move this logic to Week component maybe?
  const rootStore = useRootStore();
  rootStore.setUser(user);
}
