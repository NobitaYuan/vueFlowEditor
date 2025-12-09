<script lang="ts" setup>
import { useDragAndDrop } from '../hooks'
import { SidebarTreeType } from '../type'
interface IProps {
  vueFlowInstanceId: string
  data: SidebarTreeType[]
}
const Props = withDefaults(defineProps<IProps>(), {})

const { onDragStart } = useDragAndDrop(Props.vueFlowInstanceId)
</script>

<template>
  <div class="sidebar">
    <t-tree :data="Props.data" expand-on-click-node activable line hover expandAll :keys="{ label: 'label', value: 'id' }">
      <template #label="{ node }">
        <div class="treeItem" :draggable="node.data.type === 'node'" @dragstart="onDragStart($event, node.data)">
          {{ node.data.label }}
        </div>
      </template>
    </t-tree>
    <!-- <div class="nodes">
      <div class="vue-flow__node-input" :draggable="true" @dragstart="onDragStart($event, customShape.class)">Input Node</div>
      <div class="vue-flow__node-default" :draggable="true" @dragstart="onDragStart($event, 'default')">Default Node</div>
      <div class="vue-flow__node-output" :draggable="true" @dragstart="onDragStart($event, 'output')">Output Node</div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 12px;
  .treeItem {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
  }
}
</style>
