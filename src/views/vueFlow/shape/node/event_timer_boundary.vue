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
      <div class="innerBorder">
        <svgIcon class="icon" :name="customShape.event_timer_boundary" />
      </div>

      <div class="label">{{ name }}</div>
    </div>
  </baseNodeTemplate>
</template>

<style lang="scss" scoped>
.event_start {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-boundary-event);
  border-radius: 50%;
  background-color: var(--td-bg-color-container);
  padding: 2px;
  .innerBorder {
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-boundary-event);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 23px;
      color: var(--color-boundary-event);
    }
  }
  .label {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    color: var(--color-boundary-event);
    transform: translate(-50%, 0%);
    white-space: nowrap;
  }
}
</style>
