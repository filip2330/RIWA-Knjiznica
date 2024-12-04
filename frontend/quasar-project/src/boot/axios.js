import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" }); // Backend URL

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios; // Globalni pristup Axios-u
  app.config.globalProperties.$api = api; // Globalni pristup tvojoj API konfiguraciji
});

export { axios, api };
