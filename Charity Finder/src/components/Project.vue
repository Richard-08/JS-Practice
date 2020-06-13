<template>
  <div class="project">
    <div class="project__img">
      <img :src="project.image.imagelink[3].url" alt="" />
    </div>

    <div class="project-description">
      <div class="project-description__theme-contry">
        <span class="theme">{{ project.themeName }}</span>
        <span>|</span>
        <span class="country">{{ project.country }}</span>
      </div>

      <h2 class="project-description__title">
        <a :href="project.projectLink">{{ project.title }}</a>
      </h2>

      <div class="project-description__organization">
        <span>by</span>
        <h4>
          <a :href="project.organization.url">{{
            project.organization.name
          }}</a>
        </h4>
      </div>

      <div class="project-description__need">
        <p>{{ project.summary }}</p>
      </div>

      <div class="project-description__goal">
        <p>
          <span class="funding">${{ project.funding }}</span> raised of
          <span class="goal">${{ project.goal }}</span> goal
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
    },
  },
};
</script>

<style>
.project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  box-shadow: 0px 0px 5px 5px rgba(121, 82, 82, 0.05);
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
}

.project__img {
  width: 40%;
  height: 100%;
}

.project__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-description {
  flex: 1;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.project-description__theme-contry {
  margin-bottom: auto;
  font-weight: 600;
  font-size: 14px;
}

.project-description__theme-contry span:nth-child(2) {
  margin: 0 5px;
}

.theme,
.country {
  color: #c3c3c3;
  text-transform: uppercase;
}

.project-description__title a {
  color: #2c3e50;
}

.project-description__organization {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.project-description__organization span {
  margin-right: 5px;
}

.project-description__organization a {
  color: #2c3e50;
}

.project-description__need {
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.funding {
  padding: 5px;
  border-radius: 20px;
  background-color: mediumspringgreen;
  letter-spacing: 2px;
  font-weight: 600;
}

.goal {
  font-weight: 600;
  color: tomato;
  letter-spacing: 2px;
}

.project-description__goal {
  margin-top: auto;
  margin-left: auto;
  margin-bottom: 5px;
}

@media screen and (max-width: 800px) {
  .project {
    flex-direction: column;
    height: auto;
  }

  .project__img {
    width: 100%;
  }

  .project-description {
    text-align: center;
    align-items: center;
  }

  .project-description__goal {
    margin: 10px auto;
  }
}
</style>
