<script lang="ts" setup>
import { NodeProps } from '@vue-flow/core'
import baseNode from './baseNode.vue'
import { nodeDataType } from '../../type'

interface IProps extends NodeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <baseNode v-bind="Props">
    <div class="template">继承模板</div>
  </baseNode>
</template>

<style lang="scss" scoped>
.template {
}
</style>
