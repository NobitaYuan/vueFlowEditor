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
      <div class="bg">
        <svgIcon class="icon" :name="customShape.gateway_parallel" />
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
  .bg {
    // 旋转45度
    transform: rotate(45deg);
    position: absolute;
    background-color: var(--td-bg-color-container);
    left: 15%;
    top: 15%;
    width: 70%;
    height: 70%;
    border: 1px solid var(--color-gateway);
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      color: var(--color-gateway);
      transform: rotate(-45deg);
    }
  }
  .label {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    color: var(--color-gateway);
    transform: translate(-50%, 0%);
    white-space: nowrap;
  }
}
</style>
