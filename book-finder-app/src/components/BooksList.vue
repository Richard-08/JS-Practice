<template>
  <div class="books-list">
    <BookItem
      v-for="(book, index) in books"
      v-bind:book="book"
      v-bind:key="index"
    />
  </div>
</template>

<script>
import BookItem from "./BookItem";

export default {
  props: ["books"],
  components: {
    BookItem,
  },
};
</script>

<style>
.books-list {
  max-width: 100%;
  width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
}

@media screen and (max-width: 930px) {
  .books-list {
    grid-gap: 20px;
  }
}

@media screen and (max-width: 930px) {
  .books-list {
    grid-template-columns: 1fr;
  }
}
</style>
