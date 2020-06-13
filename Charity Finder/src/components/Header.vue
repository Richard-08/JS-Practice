<template>
  <header class="header">
    <h1 class="header__title">Charity Finder</h1>
    <p class="header__decription">
      Contribute to charity. The application provides a list of global
      charitable organizations in which you can search for charitable activities
      that match your philanthropic interests.
    </p>
    <p class="header__decription">Do good and make the world a better place.</p>
  </header>
</template>

<script>
export default {};
</script>

<style>
.header {
  background-image: url("../assets/img/bg.jpg");
  background-size: contain;
  background-position: center center;
  text-align: center;
  padding: 80px 20px;
}

.header__title {
  margin-bottom: 30px;
  font-size: 5rem;
}

.header__decription {
  background-color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 1.8rem;
  font-weight: 600;
}

@media screen and (max-width: 600px) {
  .header__title {
    font-size: 3rem;
  }
  .header__decription {
    font-size: 1.5rem;
  }
}
</style>
