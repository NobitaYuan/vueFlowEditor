<script lang="ts" setup>
import { vueFlowEditor, useVueFlow, MarkerType } from '@/package/index'
import type { Node, Edge } from '@/package/index'
import { useSidebar } from './hooks/useSidebar'
import { customNodes } from './shape'
import nodesExample from './data/nodes.json'
import edgesExample from './data/edges.json'
const { sidebarData } = useSidebar()

const nodes = ref<Node[]>(nodesExample)
const edges = ref<Edge[]>(edgesExample)

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
      parentNode: item.parentNode,
      zIndex: item.zIndex,
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
      sourceHandle: item.sourceHandle,
      targetHandle: item.targetHandle,
      markerStart: item.markerStart,
      markerEnd: 'arrow',
      zIndex: item.zIndex,
    }
  })
  console.log('nodes：', nodes, 'edges：', edges)
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
