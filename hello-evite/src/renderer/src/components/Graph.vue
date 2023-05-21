<template>
  <svg id="svg" />
</template>
  
<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import * as d3 from 'd3'

const graphData = ref([]);
const width = ref(0);
const height = ref(0);

const props = defineProps({
  project: String,
});

const nodes = computed(() => {
  let nodes = graphData.value.pages
    .map(page => ({
      id: page.id,
      title: page.title,
      x: width.value * Math.random(),
      y: height.value * Math.random(),
      rx: byteLength(page.title) * 2,
      ry: 10,
      user: false
    }));

  const users = graphData.value.users
    .map(user => ({
      id: user.id,
      title: user.name,
      x: width.value * Math.random(),
      y: height.value * Math.random(),
      rx: byteLength(user.name),
      ry: 10,
      user: true
    }));
  nodes = nodes.concat(users);
  return nodes;
});

const edges = computed(() => {
  const ids = new Set(nodes.value.map(node => node.id));
  const idm = new Map();
  nodes.value.forEach((node, index) => idm[node.id] = index);
  let edges = graphData.value.links
    .filter(edge => ids.has(edge.from) && ids.has(edge.to))
    .map(edge => ({
      source: idm[edge.from],
      target: idm[edge.to],
      l: Math.random() * 150
    }));

  const userPages = graphData.value.userPages
    .filter(up => ids.has(up.user) && ids.has(up.page))
    .map(up => ({
      source: idm[up.user],
      target: idm[up.page],
      l: Math.random() * 300
    }));
  edges = edges.concat(userPages);
  return edges;
});

onMounted(async () => {
  width.value = document.querySelector('svg').clientWidth;
  height.value = document.querySelector('svg').clientHeight;
  await fetchData();
  await render();
});

watch(() => props.project, async () => {
  await fetchData();
  await render();
});

const fetchData = async () => {
  const res = await fetch(
    `https://sb-graph-kondoumh.netlify.app/${encodeURIComponent(props.project)}_graph.json`,
    { mode: 'cors' }
  );
  graphData.value = await res.json();
};

const exportToSvg = async project => {
  const svgContainer = d3.select('svg')
                          .attr('xmlns','http://www.w3.org/2000/svg')
                          .attr("version",'1.1');
  window.mainApi.exportToSvg(project, svgContainer.node().outerHTML);
}

const render = async () => {
  d3.select('svg').selectAll('*').remove();

  const zoom = d3.zoom()
    .scaleExtent([1 / 3, 40])
    .on('zoom', (e, d) => {
      link.attr('transform', e.transform);
      nodeGroup.attr('transform', e.transform);
    });

  d3.select('svg')
    .attr('viewBox', '0 0 1200 1400')
    .attr("preserveAspectRatio", "xMidYMid meet")
    .call(zoom);

  const link = d3.select('svg')
    .selectAll('line')
    .data(edges.value)
    .enter()
    .append('line')
    .attr('stroke-width', 1)
    .attr('stroke', 'LightGray');

  const nodeGroup = d3.select('svg')
    .selectAll('g')
    .data(nodes.value)
    .enter()
    .append('g')
    .call(d3.drag()
      .on('start', (e, d) => {
        if (!e.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (e, d) => {
        d.fx = e.x;
        d.fy = e.y;
      })
      .on('end', (e, d) => {
        if (!e.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }))
    .on('click', (e, d) => {
      if (d.user) return;
      const page = encodeURIComponent(d.title);
      const url = `https://scrapbox.io/${encodeURIComponent(props.project)}/${page}`;
      window.open(url);
    });

  nodeGroup.append('ellipse')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('rx', d => d.rx)
    .attr('ry', d => d.ry)
    .attr('fill', d => d.user ? 'Cyan' : 'Gold');

  nodeGroup.append('text')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('fill', 'steelbule')
    .style('font-size', '11px')
    .text(d => d.title);

  const simulation = d3.forceSimulation()
    .force('link',
      d3.forceLink()
        .distance(d => d.l)
        .iterations(2))
    .force('collide',
      d3.forceCollide()
        .radius(d => d.r)
        .strength(0.7)
        .iterations(2))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('x', d3.forceX().strength(0.01).x(width.value / 2))
    .force('y', d3.forceY().strength(0.01).y(height.value / 2))
    .force('center', d3.forceCenter(width.value / 2, height.value / 2));

  simulation
    .nodes(nodes.value)
    .on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      nodeGroup.select('ellipse')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
      nodeGroup.select('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

  simulation.force('link')
    .links(edges.value)
    .id(d => d.index);

  link.call(zoom);
  nodeGroup.call(zoom);
};

const byteLength = (str) => {
  str = (str == null) ? "" : str;
  return encodeURI(str).replace(/%../g, "*").length;
};

defineExpose({
  exportToSvg
});
</script>
  
<style scoped>
svg {
  position: fixed;
  top: 50px;
  left: 0;
  height: 100%;
  width: 100%
}
</style>