<script setup lang="ts">
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

// import { NodeToolbar } from '@vue-flow/node-toolbar'
import { NodeResizer } from '@vue-flow/node-resizer'
import { nodeDataType } from '../../type'
import { useVueFlowGlobal } from '../../hooks'
import nameEditor from './components/nameEditor.vue'

interface IProps extends NodeProps {
  data: nodeDataType
  defaultLabel?: boolean
  vueFlowInstanceId?: string
}
const Props = withDefaults(defineProps<IProps>(), {
  defaultLabel: true,
  dimensions: () => ({
    width: 100,
    height: 100,
  }),
})

// console.log('Props', Props)

// const x = computed(() => `${Math.round(Props.position.x)}px`)
// const y = computed(() => `${Math.round(Props.position.y)}px`)

// 当前节点的样式
// const { getNodes } = useVueFlow(Props.vueFlowInstanceId)
// const curNodeStyle = computed(() => {
//   return getNodes.value.find((item) => item.id === Props.id)?.style || {}
// })

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
  <div class="baseNode">
    <div class="mt-[10px] text-center" v-if="defaultLabel">
      <nameEditor v-bind="Props" />
    </div>
    <slot></slot>

    <slot name="nodeResizer" :isResizerShow="isResizerShow">
      <NodeResizer class="resizer" :isVisible="isResizerShow" :data="Props.data" :min-width="50" :min-height="50" />
    </slot>

    <!-- <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition || Position.Right">
      <div class="flex flex-col gap-1">
        <t-button>delete</t-button>
        <t-button>copy</t-button>
        <t-button>expand</t-button>
      </div>
    </NodeToolbar> -->

    <slot name="handle" :isHandelShow="isHandelShow">
      <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Top" type="source" :position="Position.Top" />
      <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Bottom" type="source" :position="Position.Bottom" />
      <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Left" type="source" :position="Position.Left" />
      <Handle class="handel" :class="{ handelShow: isHandelShow }" :id="Position.Right" type="source" :position="Position.Right" />
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.baseNode {
  height: 100%;
  width: 100%;
}
.handel {
  opacity: 0;
  &.handelShow {
    opacity: 1;
  }
}
// .rightBottom {
//   left: 50%;
//   top: 50%;
//   right: unset;
//   bottom: unset;
//   transform: translate(50%, 50%);
// }
</style>
