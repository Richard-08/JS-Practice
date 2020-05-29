<template>
  <header class="header">
    <div class="container">
      <SearchForm v-on:search-book="search" />

      <h1 class="header__logo">Book Finder</h1>
    </div>
  </header>
</template>

<script>
import SearchForm from "./SearchForm";

export default {
  components: {
    SearchForm,
  },
  methods: {
    search(query) {
      this.$emit("search-book", query);
    },
  },
};
</script>

<style>
.header {
  background-color: #41b883;
}

.container {
  max-width: 100%;
  width: 1120px;
  margin: 0 auto;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  color: #fff;
  user-select: none;
}

@media screen and (max-width: 800px) {
  .container {
    flex-direction: column-reverse;
  }
  .header__logo {
    margin-bottom: 30px;
  }
}
</style>
