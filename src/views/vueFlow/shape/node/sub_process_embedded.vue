<script lang="ts" setup>
import { NodeProps } from '@/package/index'
import { nodeDataType, baseNodeTemplate } from '@/package/index'

interface IProps extends NodeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})

const name = computed(() => Props.data?.name || Props.data?.label || '')
</script>

<template>
  <baseNodeTemplate v-bind="Props" :defaultLabel="false">
    <div class="event_start">
      <div class="innerBorder"></div>
      <div class="label">{{ name }}</div>
    </div>
  </baseNodeTemplate>
</template>

<style lang="scss" scoped>
.event_start {
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--color-task);
  border: 1px solid var(--color-task);
  border-radius: 8px;
  background-color: var(--td-bg-color-container);
  padding: 2px;
  .innerBorder {
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-task);
    border-radius: 6px;
  }

  .label {
    position: absolute;
    font-size: 14px;
    width: calc(100% - 12px);
    height: calc(50% - 12px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -12px);
    text-align: center;
    // white-space: nowrap;
  }
}
</style>
