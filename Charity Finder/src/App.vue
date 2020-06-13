<template>
  <div id="app">
    <Header />
    <Form
      v-bind:class="{ sticky: isSticky }"
      @filter-projects="filterProjects"
    />
    <Main
      v-bind:projects="projects"
      v-bind:style="{
        marginTop: this.isSticky ? `${this.getFormHeight}px` : '0px',
      }"
      v-if="projects.length"
    />
    <button class="more" v-on:click="showMoreProjects" v-if="!loading.state">
      More Projects...
    </button>

    <Loader v-show="loading.state" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import Main from "./components/Main.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  data() {
    return {
      projects: [],
      allProjectsUrl:
        "https://api.globalgiving.org/api/public/projectservice/all/projects/active?api_key=edc2fcc1-3c89-4c5a-adac-ef7db9c83f01",
      urlForFilterProjects: null,
      nextProjects: { id: "" },
      isSticky: false,
      loading: { state: true },
    };
  },
  components: {
    Header,
    Form,
    Main,
    Loader,
  },
  mounted() {
    getProjectsData(
      this.projects,
      this.allProjectsUrl,
      this.nextProjects,
      this.loading
    );
    window.addEventListener("scroll", this.onScroll);
  },
  computed: {
    getFormTop() {
      const form = document.querySelector(".form");
      return form.offsetTop;
    },
    getFormHeight() {
      const form = document.querySelector(".form");
      return form.clientHeight;
    },
  },
  methods: {
    onScroll() {
      console.log(this.getFormTop);

      if (window.pageYOffset >= this.getFormTop - this.getFormHeight) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
    showMoreProjects() {
      const projectsUrl = this.urlForFilterProjects
        ? `${this.urlForFilterProjects}&nextProjectId=${this.nextProjects.id}`
        : `${this.allProjectsUrl}&nextProjectId=${this.nextProjects.id}`;
      getProjectsData(
        this.projects,
        projectsUrl,
        this.nextProjects,
        this.loading
      );
    },
    filterProjects(id) {
      console.log(id);
      this.urlForFilterProjects = `https://api.globalgiving.org/api/public/projectservice/themes/${id}/projects?api_key=edc2fcc1-3c89-4c5a-adac-ef7db9c83f01`;
      this.projects.length = 0;
      getProjectsData(
        this.projects,
        this.urlForFilterProjects,
        this.nextProjects,
        this.loading
      );
    },
  },
};

/* ------------------Fetch data by API--------------------- */

function getProjectsData(arr, url, next, loading) {
  loading.state = true;
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      next.id = data.projects.nextProjectId;
      arr.push(...data.projects.project);
      loading.state = false;
    });
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@400;600&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  border: none;
  text-decoration: none;
  font-family: "Dosis", sans-serif;
}

img {
  max-width: 100%;
}

#app {
  font-family: "Dosis", sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.more {
  display: block;
  background-color: rgb(255, 140, 140);
  border: 2px solid rgb(255, 140, 140);
  padding: 8px;
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  margin: 0 auto;
  margin-bottom: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.more:hover {
  background-color: transparent;
  color: rgb(255, 140, 140);
}
</style>
