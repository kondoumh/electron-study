<template>
  <div>
    <Header @project-changed="switchProject" @export-svg="exportToSvg" />
    <Graph ref="graph" v-bind:project="project" />
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

const graph = ref(null);

const exportToSvg = () => {
  graph.value.exportToSvg(project.value);
}
</script>

<style scoped></style>
