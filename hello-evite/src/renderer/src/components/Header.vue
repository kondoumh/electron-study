<template>
  <header>
    <h2>Scrapbox graph</h2>
    <select v-model="project" @change="onChange">
      <option>help-jp</option>
      <option>comic-forum</option>
      <option>icons</option>
    </select>
    <button @click="onExportToSvg">export to svg</button>
  </header>
</template>
  
<script setup>
import { ref } from 'vue';

const project = ref('help-jp');
const emit = defineEmits(['project-changed', 'export-svg']);

const onChange = () => {
  emit('project-changed', project.value);
}
const onExportToSvg = () => {
  emit('export-svg');
}
</script>
  
<style scoped>
header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
}

h2 {
  margin: 0;
  margin-left: 1em;
  text-align: left;
}

select {
  position: fixed;
  top: 0px;
  right: 100px;
  margin: 1em;
}

button {
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 1em;
}
</style>
