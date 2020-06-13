<template>
  <main class="main">
    <div class="container">
      <div class="projects-box">
        <Project
          v-for="(project, index) in projects"
          v-bind:key="index"
          v-bind:project="project"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Project from "./Project.vue";

export default {
  props: {
    projects: {
      type: Array,
    },
  },
  components: {
    Project,
  },
};
</script>

<style>

.main {
    padding: 60px 0;
}

.container {
    max-width: 100%;
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
}

.projects-box {
    display: flex;
    flex-direction: column;
}

</style>
