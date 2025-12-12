<script lang="ts" setup>
import { NodeProps } from '@/package/index'
import { nodeDataType, baseNodeTemplate } from '@/package/index'
import svgIcon from '@/components/svgIcon/index.vue'
import { customShape } from '../index'

interface IProps extends NodeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})
const name = computed(() => Props.data?.name || Props.data?.label || '')
</script>

<template>
  <baseNodeTemplate v-bind="Props" :defaultLabel="false">
    <div class="event_start">
      <svgIcon class="icon" :name="customShape.task_script" />
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
  border-radius: 4px;
  background-color: var(--td-bg-color-container);
  .icon {
    margin-left: 8px;
    margin-top: 8px;
    font-size: 24px;
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
