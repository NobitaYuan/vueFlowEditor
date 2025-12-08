<script lang="ts" setup>
import { useDragAndDrop } from '../hooks'
import { customShape } from '../shape'
interface IProps {
  vueFlowInstanceId: string
}
const Props = withDefaults(defineProps<IProps>(), {})

const { onDragStart } = useDragAndDrop(Props.vueFlowInstanceId)
</script>

<template>
  <div class="sidebar">
    <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, customShape.class)">Input Node</div>

      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node</div>

      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 12px;
}
</style>
