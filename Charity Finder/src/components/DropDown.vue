<template>
  <ul class="dropdown">
    <li class="dropdown__placeholder" v-on:click="showFilters">
      {{ selectedFilter }}
    </li>

    <ul class="filters" v-bind:class="{ show: isShow }">
      <DropDownItems
        v-for="theme in themes"
        v-bind:key="theme.id"
        v-bind:themes="theme"
        @select-filter="selectFilter"
      />
    </ul>
  </ul>
</template>

<script>
import DropDownItems from "./DropDownItems.vue";

export default {
  data() {
    return {
      themes: [],
      isShow: false,
      selectedFilter: "Theme",
    };
  },
  mounted() {
    fetch(
      "https://api.globalgiving.org/api/public/projectservice/themes?api_key=edc2fcc1-3c89-4c5a-adac-ef7db9c83f01",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.themes.push(...data.themes.theme));
  },
  methods: {
    showFilters() {
      this.isShow = !this.isShow;
    },
    selectFilter(id, name) {
      this.selectedFilter = name;
      this.isShow = !this.isShow;
      this.$emit("search-filter", id);
    },
  },
  components: {
    DropDownItems,
  },
};
</script>

<style>
.dropdown {
  width: 280px;
  position: relative;
  background-color: #fff;
}

.dropdown__placeholder {
  padding: 10px 10px 10px 25px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.dropdown__placeholder:hover {
  color: rgb(255, 140, 140);
}

.filters {
  position: absolute;
  width: 280px;
  height: 85vh;
  overflow-y: scroll;
  background-color: #fff;
  padding: 10px 0;
  margin-top: 5px;

  transform: translateY(-50%) scaleY(0);
  opacity: 0;
  transition: all 0.3s ease;
}

.filters.show {
  transform: translateY(0) scaleY(1);
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .dropdown {
    width: 300px;
  }

  .filters {
    width: 300px;
    height: 60vh;
  }
}

@media screen and (max-width: 420px) {
  .dropdown {
    font-size: 16px;
  }

  .dropdown__placeholder  {
    padding: 5px 5px 5px 15px;
  }
}
</style>
