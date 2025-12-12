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
    <div class="event_signal_start">
      <svgIcon class="icon" :name="customShape.event_signal_start" />
      <div class="label">{{ name }}</div>
    </div>
  </baseNodeTemplate>
</template>

<style lang="scss" scoped>
.event_signal_start {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-event);
  border-radius: 50%;
  background-color: var(--td-bg-color-container);
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    color: var(--color-event);
  }
  .label {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    color: var(--color-event);
    transform: translate(-50%, 0%);
    white-space: nowrap;
  }
}
</style>
