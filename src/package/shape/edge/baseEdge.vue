<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@vue-flow/core'
import { nodeDataType } from '../../type'

interface IProps extends EdgeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})

const path = computed(() => getBezierPath(Props))
</script>

<!-- <script lang="ts">
export default {
  inheritAttrs: false,
}
</script> -->

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge :path="path[0]" />

  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      {{ data.label }}
    </div>
  </EdgeLabelRenderer>
</template>
