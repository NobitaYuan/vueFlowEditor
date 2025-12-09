<script lang="ts" setup>
import { vueFlowEditor, baseCustomShape, SidebarTreeType } from '@/package/index'
import type { Node, Edge } from '@/package/index'
import 'vue-flow-editor/index.css'

const sidebarData = ref<SidebarTreeType[]>([
  {
    id: '1',
    label: '节点1',
    type: 'node',
    shape: 'class',
    data: {
      name: '节点1',
    },
    style: {},
  },
  {
    id: '2',
    label: '节点2',
    type: 'node',
    shape: 'class',
    data: {
      name: '节点2',
    },
    children: [
      {
        id: '2-1',
        label: '节点2-1',
        type: 'node',
        shape: 'class',
        data: {
          name: '节点2-1',
        },
      },
    ],
  },
])

const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1',
    type: baseCustomShape.class,
    position: { x: 150, y: 250 },
    width: 300,
    height: 300,
    data: { name: 'Node 1' },
    style: {},
  },
  {
    id: '1-1',
    type: baseCustomShape.class,
    width: 200,
    height: 200,
    position: { x: 10, y: 10 },
    data: { name: 'Node 1-1' },
    // expandParent: true,
    parentNode: '1',
  },
  {
    id: '1-2',
    type: baseCustomShape.class,
    position: { x: 10, y: 80 },
    width: 100,
    height: 100,
    data: { name: 'Node 1-2' },
    // extent: 'parent',
    parentNode: '1-1',
  },
  {
    id: '3',
    type: 'output',
    position: { x: 300, y: 600 },
    data: { label: 'Node 3' },
    style: {},
  },
  {
    id: '4',
    type: baseCustomShape.baseNode, // <-- this is the custom node type name
    position: { x: 500, y: 280 },
    width: 200,
    height: 200,
    data: {
      name: 'Node 4',
      hello: 'world',
    },
    style: {},
  },
  {
    id: '5',
    type: baseCustomShape.class, // <-- this is the custom node type name
    position: { x: 500, y: 500 },
    width: 150,
    height: 150,
    data: {
      name: '作战任务',
      hello: 'world',
    },
  },
])
const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2->3',
    source: '1-1',
    target: '1-2',
    zIndex: 999,
    animated: true,
  },
  {
    id: 'e3->4',
    type: baseCustomShape.baseEdge,
    source: '3',
    target: '4',
    data: {
      name: 'world',
    },
  },
])

const vueFlowEditorRef = ref<InstanceType<typeof vueFlowEditor>>()
</script>

<template>
  <div class="vueFlowPlay">
    <vueFlowEditor ref="vueFlowEditorRef" :sidebarData="sidebarData" :nodes="nodes" :edges="edges" />
  </div>
</template>

<style lang="scss" scoped>
.vueFlowPlay {
  height: 100%;
}
</style>
