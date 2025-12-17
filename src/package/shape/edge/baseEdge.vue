<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, type EdgeProps } from '@vue-flow/core'
import { nodeDataType } from '../../type'

interface IProps extends EdgeProps {
  data: nodeDataType
  vueFlowInstanceId?: string
}
const Props = withDefaults(defineProps<IProps>(), {})

const path = computed(() => getSmoothStepPath(Props))

const curName = computed(() => Props.data?.name || Props.data?.label || Props?.label || '')
</script>

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge ref="edgeRef" :path="path[0]" v-bind="Props" />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      class="baseEdgeLabel"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
    >
      {{ curName }}
    </div>
  </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
.baseEdgeLabel {
  color: var(--td-text-color-primary);
  font-size: 12px;
  background-color: var(--td-bg-color-container);
  padding: 2px;
  border-radius: 2px;
}
</style>
