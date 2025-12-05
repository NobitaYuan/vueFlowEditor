<script setup lang="ts">
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'
import { nodeDataType } from '../../type'
import { useVueFlowGlobal } from '../../hooks'

interface IProps extends NodeProps {
  data: nodeDataType
  defaultLabel?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
  defaultLabel: true,
})

// const x = computed(() => `${Math.round(Props.position.x)}px`)
// const y = computed(() => `${Math.round(Props.position.y)}px`)

const { isMouseOnNode } = useVueFlowGlobal()

// 是否鼠标悬浮
const isHovered = computed(() => {
  if (!isMouseOnNode.value) return false
  return Props.id === isMouseOnNode.value.node.id
})

// 是否显示连接点
const isHandelShow = computed(() => {
  return Boolean(Props.selected || isHovered.value)
})

// 是否显示尺寸调整器
const isResizerShow = computed(() => {
  return Props.selected || isHovered.value
})
</script>

<template>
  <div
    class="vue-flow__node-default"
    :style="{
      width: `${Props.dimensions.width}px`,
      height: `${Props.dimensions.height}px`,
    }"
  >
    <div class="mt-[10px]" v-if="defaultLabel">{{ data.name }}</div>

    <slot></slot>

    <NodeResizer v-if="isResizerShow" :min-width="20" :min-height="20" />

    <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition || Position.Right">
      <div class="flex flex-col gap-1">
        <t-button>delete</t-button>
        <t-button>copy</t-button>
        <t-button>expand</t-button>
      </div>
    </NodeToolbar>

    <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Top" type="source" :position="Position.Top" />
    <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Bottom" type="source" :position="Position.Bottom" />
    <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Left" type="source" :position="Position.Left" />
    <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Right" type="source" :position="Position.Right" />
  </div>
</template>
<style lang="scss" scoped>
.handel {
  opacity: 0;
  &.handelShow {
    opacity: 1;
  }
}
</style>
