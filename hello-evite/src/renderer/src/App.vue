<template>
  <div>
    <Header @projectChanged="switchProject" />
    <Graph v-bind:project="project" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Graph from './components/Graph.vue';
const project = ref('help-jp');

const switchProject = value => {
  project.value = value;
}
</script>

<style scoped></style>
