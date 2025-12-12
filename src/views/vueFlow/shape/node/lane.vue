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
      <div class="hd">
        <div class="label">{{ name }}</div>
      </div>
      <div class="bd"></div>
    </div>
  </baseNodeTemplate>
</template>

<style lang="scss" scoped>
.event_start {
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--color-lane);
  border: 1px solid var(--color-lane);
  border-radius: 2px;
  background-color: var(--td-bg-color-container);
  display: flex;
  flex-direction: column;

  .hd {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-lane);
    height: 40px;
    .label {
      font-size: 14px;
    }
  }
  .bd {
    flex: 1;
  }
}
</style>
