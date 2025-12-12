<script lang="ts" setup>
import { useDragAndDrop } from '../hooks'
import { SidebarTreeType } from '../type'
import svgIcon from './svgIcon.vue'

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
      <template #icon="{ node }">
        <svgIcon v-if="node?.data?.icon" :name="node.data.icon" :color="node.data?.iconColor || ''" />
      </template>
      <template #label="{ node }">
        <div
          class="treeItem"
          :class="{ draggable: node.data.type === 'node' && !node.data?.children?.length }"
          :draggable="node.data.type === 'node' && !node.data?.children?.length"
          @dragstart="onDragStart($event, node.data)"
        >
          {{ node.data.label }}
        </div>
      </template>
    </t-tree>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 12px;
  user-select: none;
  height: 100%;
  overflow: auto;
  .treeItem {
    width: 100%;
    // height: 32px;
    line-height: 24px;
    cursor: pointer;
    &.draggable {
      cursor: pointer;
    }
  }
}
</style>
