<template>
  <q-page padding>
    <h1>Pretrazivanje</h1>
    <p>Pretrazivanje knjiga</p>

    <!-- Pretraga -->
    <div class="search-container">
      <q-input
        v-model="searchQuery"
        label="Unesite naziv knjige"
        filled
        clearable
      />

      <q-checkbox
        v-model="searchByTitle"
        label="Pretraži po naslovu"
        color="blue"
      />

      <q-checkbox
        v-model="searchByAuthor"
        label="Pretraži po autoru"
        color="blue"
      />

      <q-btn
        label="Traži"
        color="black"
        @click="searchBooks"
        class="search-button"
      />
    </div>

    <!-- Tabela s rezultatima -->
    <q-table
      v-if="filteredBooks.length > 0"
      :rows="filteredBooks"
      :columns="columns"
      row-key="id"
      flat
      bordered
      class="results-table"
    >
      <template v-slot:body-cell-slika="props">
        <q-img
          :src="props.row.slika"
          alt="Naslovnica knjige"
          style="width: 50px; height: auto"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchByTitle: true,
      searchByAuthor: false,
      searchExecuted: false,
      books: [
      { 
          id: 1, 
          naslov: 'Put oko svijeta u 80 dana', 
          autor: 'Jules Verne', 
          opis: 'Avanturistički roman o putovanju Phileasa Fogga koji pokušava obići svijet u 80 dana kako bi dobio okladu.', 
          stanje: 4 
        },
        { 
          id: 2, 
          naslov: 'Bratstvo prstena', 
          autor: 'J.R.R. Tolkien', 
          opis: 'Prva knjiga epske trilogije o ratu za Prsten i sudbinama koje ga okružuju.', 
          stanje: 5 
        },
        { 
          id: 3, 
          naslov: 'Djevojka iz vlaka', 
          autor: 'Paula Hawkins', 
          opis: 'Psihološki triler o ženi koja svjedoči nečemu jezivom dok putuje vlakom i postaje upletena u istragu.', 
          stanje: 3 
        },
        { 
          id: 4, 
          naslov: 'Alkemičar', 
          autor: 'Paulo Coelho', 
          opis: 'Inspirativna priča o mladom pastiru koji kreće na putovanje kako bi pronašao svoju osobnu legendu.', 
          stanje: 4
        },
        { 
          id: 5, 
          naslov: 'Harry Potter i Kamen mudraca', 
          autor: 'J.K. Rowling', 
          opis: 'Prvi roman o Hariju Poteru, mladom čarobnjaku koji otkriva svoje magične moći i kreće u školu čarobnjaštva.', 
          stanje: 2 
        },
        { 
          id: 6, 
          naslov: 'Ubiti pticu rugalicu', 
          autor: 'Harper Lee', 
          opis: 'Priča o odrastanju i nepravdi kroz oči djevojčice Scout u južnjačkom gradu 1930-ih.', 
          stanje: 5 
        },
        { 
          id: 7, 
          naslov: 'Don Quijote', 
          autor: 'Miguel de Cervantes', 
          opis: 'Satiričan roman o vitezu Don Quijoteu.', 
          stanje: 2 
        },
        { 
          id: 8, 
          naslov: 'Frankenstein', 
          autor: 'Mary Shelley', 
          opis: 'Klasična priča o znanstveniku Viktoru Frankensteinu i stvorenju koje dolazi u sukob sa svojim tvorcem.', 
          stanje: 4 
        },
      ],
      filteredBooks: [],
      columns: [
        { name: "id", label: "ID", field: "id", align: "left" },
        { name: "naslov", label: "Naslov", field: "naslov", align: "left" },
        { name: "autor", label: "Autor", field: "autor", align: "left" },
        { name: "opis", label: "Opis", field: "opis", align: "left" },
        { name: "slika", label: "Slika", field: "slika", align: "center" },
        {
          name: "stanje",
          label: "Stanje (ukupan broj primjeraka)",
          field: "stanje",
          align: "right",
        },
      ],
    };
  },
  methods: {
    searchBooks() {
      this.searchExecuted = true;
      this.filteredBooks = this.books.filter((book) => {
        const query = this.searchQuery.toLowerCase();
        return (
          (this.searchByTitle && book.naslov.toLowerCase().includes(query)) ||
          (this.searchByAuthor && book.autor.toLowerCase().includes(query))
        );
      });
    },
  },
};
</script>
