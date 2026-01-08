<script lang="ts" setup>
import { vueFlowEditor, baseCustomShape, useVueFlow, MarkerType } from '@/package/index'
import type { Node, Edge, ConnectionLineType } from '@/package/index'
import { useSidebar } from './hooks/useSidebar'
import { customNodes } from './shape'
import exampleData from './data/example.json'
const { sidebarData } = useSidebar()

const nodes = ref<Node[]>(exampleData)
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

const { getNodes, getEdges } = useVueFlow()

const exportData = () => {
  const nodes = getNodes.value.map((item) => {
    return {
      id: item.id,
      type: item.type,
      position: item.position,
      data: item.data,
      style: item.style,
      width: item.dimensions.width,
      height: item.dimensions.height,
    }
  })
  const edges = getEdges.value.map((item) => {
    return {
      id: item.id,
      source: item.source,
      target: item.target,
      data: item.data,
      style: item.style,
      type: item.type,
    }
  })
  console.log('JsonData ', nodes, edges)
}
</script>

<template>
  <div class="vueFlowPlay">
    <vueFlowEditor
      :customNodes="customNodes"
      :sidebarData="sidebarData"
      :nodes="nodes"
      :edges="edges"
      :flowProps="{
        connectionLineOptions: {
          // type: baseCustomShape.animationEdge as unknown as ConnectionLineType,
          markerEnd: MarkerType.Arrow,
          style: {
            strokeWidth: 2,
          },
        },
      }"
    >
      <div class="panel">
        <t-button @click="exportData">导出数据</t-button>
      </div>
    </vueFlowEditor>
  </div>
</template>

<style lang="scss" scoped>
.vueFlowPlay {
  height: 100%;
  --color-event: #22c990;
  --color-task: #1373f7;
  --color-event2: #9a0502;
  --color-boundary-event: #ff5500;
  --color-catch-event: #18847b;
  --color-gateway: #fca61b;
  --color-lane: rgb(78, 89, 105);
  :deep(.icon) {
    fill: currentColor;
  }
  .panel {
    position: absolute;
    bottom: 12px;
    right: 12px;
    z-index: 999;
  }
}
</style>
