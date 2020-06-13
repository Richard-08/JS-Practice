<template>
  <li class="filter" v-on:click="$emit('select-filter', themes.id, themes.name)">
    {{ themes.name }}
  </li>
</template>

<script>
export default {
  props: ["themes"],
};
</script>

<style>
.filter {
  padding: 5px 10px 5px 25px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
}

.filter:last-child {
  margin-bottom: 0;
}

.filter:hover {
  background-color: rgba(241, 241, 241, 0.7);
  color: rgb(255, 140, 140);
}
</style>
