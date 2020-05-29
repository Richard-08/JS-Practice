<template>
  <form class="search-form" @submit.prevent="onSubmit">
    <input
      type="text"
      class="search-form__input"
      placeholder="Enter title, author, published date, etc"
      v-model="title"
    />
    <button type="submit" class="search-form__submit-btn">Search</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    onSubmit() {
      const query = this.title
        .trim()
        .split(" ")
        .join("+");
      this.$emit("search-book", query);
      this.title = "";
    },
  },
};
</script>

<style>
.search-form__input,
.search-form__submit-btn {
  padding: 10px;
  border-radius: 25px;
  color: #2c3e50;
  font-size: 16px;
  transition: all 0.2s ease;
  font-family: "Poppins", sans-serif;
}

.search-form__input {
  margin-right: 15px;
  border: 1px solid #fff;
}

.search-form__input:focus {
  border: 1px solid #fb6542;
}

.search-form__submit-btn {
  width: 150px;
  background-color: #fb6542;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
}

.search-form__submit-btn:hover {
  background-color: hsl(11, 96%, 70%);
}

@media screen and (max-width: 550px) {
  .search-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-form__input {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }

  .search-form__submit-btn {
    width: 100%;
  }
}
</style>
