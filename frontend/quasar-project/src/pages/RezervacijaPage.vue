<template>
  <q-page padding>
    <h1>Popis rezervacija</h1>
    <q-table :rows="rezervacije" :columns="columns" row-key="id"> </q-table>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "RezervacijaPage",
  setup() {
    const rezervacije = ref([]);
    const columns = [
      {
        name: "naslov_knjige",
        label: "Naslov knjige",
        align: "left",
        field: "naslov_knjige",
      },
      {
        name: "autor_knjige",
        label: "Autor knjige",
        align: "left",
        field: "autor_knjige",
      },
      {
        name: "ime_korisnika",
        label: "Ime korisnika",
        align: "left",
        field: "ime_korisnika",
      },
      {
        name: "prezime_korisnika",
        label: "Prezime korisnika",
        align: "left",
        field: "prezime_korisnika",
      },
      {
        name: "datum_rezervacije",
        label: "Datum rezervacije",
        align: "left",
        field: "datum_rezervacije",
      },
    ];

    const fetchRezervacije = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/rezervirane_knjige"
        );
        rezervacije.value = response.data;
        console.log("Podaci dohvaćeni:", response.data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja podataka:", error);
      }
    };

    onMounted(fetchRezervacije);

    return {
      rezervacije,
      columns,
      fetchRezervacije,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 500;
}
</style>
