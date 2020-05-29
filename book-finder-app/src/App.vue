<template>
  <div id="app">
    <Header @search-book="searchBook" />

    <Loader v-if="loading" />

    <BooksList v-else v-bind:books="books" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import BooksList from "./components/BooksList.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  data() {
    return {
      books: [],
      question: "",
      loading: false,
    };
  },
  components: {
    Header,
    BooksList,
    Loader,
  },
  methods: {
    searchBook(query) {
      this.question = query;
      this.loading = true;
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${this.question}&key=AIzaSyBTuNdeGJMJn846DoWMBLxzuNkDrq3OJJk`
      )
        .then((response) => response.json())
        .then((data) => {
          this.books = data.items;
          this.loading = false;
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
/* font-family: 'Poppins', sans-serif; */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
  text-decoration: none;
}

#app {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: #2c3e50;
  text-align: center;
}
</style>
