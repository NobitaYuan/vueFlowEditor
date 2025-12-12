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
    {{ name }}
  </baseNodeTemplate>
</template>

<style lang="scss" scoped>
.template {
}
</style>
