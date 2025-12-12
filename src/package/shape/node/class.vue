<script lang="ts" setup>
import { NodeProps } from '@vue-flow/core'
import baseNode from './baseNode.vue'
import { nodeDataType } from '../../type'
import nameEditor from './components/nameEditor.vue'

interface IProps extends NodeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <baseNode v-bind="Props" :defaultLabel="false">
    <div class="classNode">
      <div class="hd">
        《
        <div>
          <nameEditor v-bind="Props" />
        </div>
        》
      </div>
      <div class="bd"></div>
    </div>
  </baseNode>
</template>

<style lang="scss" scoped>
.classNode {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--td-bg-color-container);
  color: var(--td-text-color-primary);
  border: 1px solid var(--td-text-color-primary);
  border-radius: 4px;
  .hd {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
