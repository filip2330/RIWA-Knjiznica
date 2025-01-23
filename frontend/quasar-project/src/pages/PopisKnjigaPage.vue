<template>
  <q-page padding>
    <h1>Popis Knjiga</h1>
    <p>Popis svih dostupnih knjiga.</p>
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'naslov', label: 'Naslov', field: 'naslov', align: 'left' },
        { name: 'autor', label: 'Autor', field: 'autor', align: 'left' },
        { name: 'opis', label: 'Opis', field: 'opis', align: 'left' },
        { name: 'stanje', label: 'Stanje', field: 'stanje', align: 'left' },
      ],
      books: [
      {
          id: 1,
          title: "The Brothers Karamazov",
          author: "Fyodor Dostoevsky",
          year: 1880,
          genre: "Philosophical",
          image: require("src/assets/images/knjiga1.jpg"),
        },
        {
          id: 2,
          title: "The Alchemist",
          author: "Paulo Coelho",
          year: 1988,
          genre: "Adventure",
          image: require("src/assets/images/knjiga2.jpg"),
        },
        {
          id: 3,
          title: "The Catch-22",
          author: "Joseph Heller",
          year: 1961,
          genre: "Satire",
          image: require("src/assets/images/knjiga3.jpg"),
        },
        {
          id: 4,
          title: "The Road",
          author: "Cormac McCarthy",
          year: 2006,
          genre: "Post-apocalyptic",
          image: require("src/assets/images/knjiga4.jpg"),
        },
        {
          id: 5,
          title: "One Hundred Years of Solitude",
          author: "Gabriel García Márquez",
          year: 1967,
          genre: "Magical Realism",
          image: require("src/assets/images/knjiga5.jpg"),
        },
        {
          id: 6,
          title: "Beloved",
          author: "Toni Morrison",
          year: 1987,
          genre: "Historical Fiction",
          image: require("src/assets/images/knjiga6.jpg"),
        },
        {
          id: 7,
          title: "The Great Expectations",
          author: "Charles Dickens",
          year: 1861,
          genre: "Classic",
          image: require("src/assets/images/knjiga7.jpg"),
        },
        {
          id: 8,
          title: "Brave New World",
          author: "Aldous Huxley",
          year: 1932,
          genre: "Dystopian",
          image: require("src/assets/images/knjiga8.jpg"),
        },
        {
          id: 9,
          title: "The Picture of Dorian Gray",
          author: "Oscar Wilde",
          year: 1890,
          genre: "Gothic",
          image: require("src/assets/images/knjiga9.jpg"),
        },
      ],
    };
  }
};
</script>
