<template>
  <div class="book">
    <div class="book__img">
      <img :src="book.volumeInfo.imageLinks.thumbnail" alt="thumbnail" />
    </div>
    <div class="book__info">
      <h4 class="book__title">{{ book.volumeInfo.title }}</h4>
      <h5 class="book__author">{{ book.volumeInfo.authors.join("") }}</h5>
      <p class="book__pages">
        Pages: <span>{{ book.volumeInfo.pageCount }}</span>
      </p>
      <p class="book__date">
        Published date: <span>{{ book.volumeInfo.publishedDate }}</span>
      </p>
      <p class="book__publisher">
        Publisher: <span>{{ book.volumeInfo.publisher }}</span>
      </p>

      <a
        :href="book.volumeInfo.previewLink"
        target="blank"
        class="book__preview"
        >Preview</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");
/* font-family: 'Montserrat', sans-serif; */
.book {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  text-align: center;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.book:hover {
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
}

.book__img {
  min-width: 200px;
  height: 100%;
}

.book__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book__info {
  flex: 1;
  padding: 10px;
}

.book__title {
  margin-bottom: 15px;
}

.book__author {
  color: #fb6542;
}

.book__info p {
  text-align: start;
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0;
}

.book__info p span {
  font-weight: 400;
}

.book__pages {
}

.book__date {
}

.book__publisher {
}

.book__preview {
  display: inline-block;
  background-color: #fb6542;
  margin-top: 20px;
  padding: 10px 40px;
  border-radius: 5px;
  color: #fff;
  transition: all 0.2s ease;
}

.book__preview:hover {
  background-color: hsl(11, 96%, 70%);
}

@media screen and (max-width: 930px) {
  .book__info p {
    text-align: center;
  }
}

@media screen and (max-width: 430px) {
  .book__img {
    min-width: 150px;
  }
}
</style>
