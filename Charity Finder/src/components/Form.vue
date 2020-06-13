<template>
  <form class="form">
    <div class="input-wrapper">
      <input type="text" class="form__input" placeholder="Search by keyword" />
      <button class="form__search-btn">Search</button>
    </div>

    <DropDown @search-filter="searchFilter" />
  </form>
</template>

<script>
import DropDown from "./DropDown.vue";

export default {
  data() {
    return {};
  },
  components: {
    DropDown,
  },
  methods: {
    searchFilter(id) {
      console.log(id);
      this.$emit("filter-projects", id);
    },
  },
};
</script>

<style>
.form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f1f1f1;
  padding: 20px;
  transition: all 0.2s ease;
}

.form.sticky {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.form__input {
  width: 300px;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #fff;
  transition: all 0.2s ease;
}

.form__input:focus {
  border: 2px solid rgb(255, 140, 140);
}

.form__search-btn {
  background-color: rgb(255, 140, 140);
  border: 2px solid rgb(255, 140, 140);
  color: #fff;
  font-size: 18px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form__search-btn:hover {
  background-color: transparent;
  color: rgb(255, 140, 140);
}

@media screen and (max-width: 768px) {
  .form {
    flex-direction: column;
  }

  .input-wrapper {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 420px) {
  .form {
    padding: 10px;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
  }

  .form__input {
    margin-bottom: 10px;
    padding: 5px;
    font-size: 16px;
  }

  .form__search-btn {
    font-size: 16px;
    padding: 5px;
  }
}
</style>
