<script lang="ts" setup>
// 必要样式
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/node-resizer/dist/style.css'
// 重置样式
import './style/index.css'

// vueFlow
import { VueFlow, Panel, PanelPosition, useVueFlow } from '@vue-flow/core'
import type { Node, Edge } from '@vue-flow/core'

// vueFlow组件
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

// 自定义节点连线组件
import baseNode from './shape/node/baseNode.vue'
import baseEdge from './shape/edge/baseEdge.vue'
import ClassNode from './shape/node/class.vue'

// 扩展逻辑
import { useVueFlowGlobal, useDropToParent, useDragAndDrop } from './hooks'
import { baseCustomShape } from './shape'
import sidebar from './components/sidebar.vue'
// import { getHelperLines } from './utils'
// import helperLines from './components/helperLines.vue'
import { vueFlowEditorEmitType, vueFlowEditorProps } from './type'
import { groupLog } from './utils'

// Props
const Props = withDefaults(defineProps<vueFlowEditorProps>(), {
  vueFlowInstanceId: undefined,
  sidebarData: () => [],
  nodes: () => [],
  edges: () => [],
  customNodes: () => [],
  customEdges: () => [],
})

const emit = defineEmits<vueFlowEditorEmitType>()

// vueFlow实例id
const vueFlowInstanceId = Props.vueFlowInstanceId

// 自定义节点
const allCustomNodes = computed(() => {
  const baseCustomNodes = [
    { name: baseCustomShape.baseNode, component: markRaw(baseNode) },
    { name: baseCustomShape.class, component: markRaw(ClassNode) },
    ...Props.customNodes,
  ]
    // 这里是处理一下name
    .map((item) => {
      return { ...item, name: 'node-' + item.name }
    })
  return baseCustomNodes
})

// 自定义连线
const customEdges = computed(() => {
  const baseCustomEdges = [{ name: baseCustomShape.baseEdge, component: markRaw(baseEdge) }, ...Props.customEdges]
    // 这里是处理一下name
    .map((item) => {
      return { ...item, name: 'edge-' + item.name }
    })
  return baseCustomEdges
})

const nodes = ref<Node[]>(Props.nodes)
const edges = ref<Edge[]>(Props.edges)

const {
  addNodes,
  addEdges,
  onInit,
  onConnect,
  onNodeClick,
  onEdgeClick,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onConnectStart,
  onConnectEnd,
  onNodesChange,
  onEdgesChange,
} = useVueFlow(vueFlowInstanceId)

const { isMouseOnNode, isConnecting } = useVueFlowGlobal()

function generateRandomNode() {
  const id = Math.random().toString()
  return {
    id,
    position: { x: Math.random() * 1500, y: Math.random() * 1500 },
    width: 100,
    height: 100,
    type: baseCustomShape.class,
    data: {
      name: 'Random Node' + id,
    },
  }
}

function onAddNode() {
  // add a single node to the graph
  addNodes(generateRandomNode())
}
function onAddNodes() {
  // add multiple nodes to the graph
  addNodes(Array.from({ length: 500 }, generateRandomNode))
}

onNodeClick((params) => {
  console.log('onNodeClick', params)
})
onEdgeClick((params) => {
  console.log('onEdgeClick', params)
})

onNodeMouseEnter((params) => {
  isMouseOnNode.value = params
})
onNodeMouseLeave(() => {
  isMouseOnNode.value = null
})

onConnectStart((params) => {
  console.log('onConnectStart', params)
  isConnecting.value = params
})
onConnect((params) => {
  console.log('onConnect', params)
  addEdges([params])
})

onConnectEnd((params) => {
  console.log('onConnectEnd', params)
  isConnecting.value = null
})

onInit((instance) => {
  groupLog('onInit', instance)
})

// 父子级拖拽
useDropToParent(vueFlowInstanceId)

// 拖拽新增
const { onDragOver, onDrop, onDragLeave } = useDragAndDrop(vueFlowInstanceId, emit)

onNodesChange((nodeChanges) => {
  console.log('onNodesChange', nodeChanges)
  nodeChanges.forEach((change) => {
    if (change.type === 'dimensions') {
    }
  })
})
onEdgesChange((edgeChanges) => {
  edgeChanges.forEach((change) => {
    if (change.type === 'add') {
      emit('addEdge', change.item)
    } else if (change.type === 'remove') {
      emit('removeEdge', change)
    }
  })
})

// 辅助线逻辑
// const helperLineHorizontal = ref<number | undefined>(undefined)
// const helperLineVertical = ref<number | undefined>(undefined)
// function updateHelperLines(changes: NodeChange[], nodes: GraphNode[]) {
//   helperLineHorizontal.value = undefined
//   helperLineVertical.value = undefined
//   if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
//     const helperLines = getHelperLines(changes[0], nodes)
//     // if we have a helper line, we snap the node to the helper line position
//     // this is being done by manipulating the node position inside the change object
//     changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x
//     changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y
//     // if helper lines are returned, we set them so that they can be displayed
//     helperLineHorizontal.value = helperLines.horizontal
//     helperLineVertical.value = helperLines.vertical
//   }
//   return changes
// }
// onNodesChange((changes) => {
//   const updatedChanges = updateHelperLines(changes, nodes.value as GraphNode[])
//   nodes.value = applyNodeChanges(updatedChanges)
// })
defineExpose({
  vueFlowInstance: useVueFlow(vueFlowInstanceId),
})
</script>

<template>
  <div class="vueFlow">
    <div class="sidebarContainer">
      <sidebar :data="Props.sidebarData" :vueFlowInstanceId="vueFlowInstanceId" />
    </div>
    <div class="vueFlowContainer" @drop="onDrop">
      <VueFlow :id="vueFlowInstanceId" :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave">
        <!-- 自定义节点 -->
        <template v-for="item in allCustomNodes" #[item.name]="nodeProps" :key="item.name">
          <component :is="item.component" v-bind="nodeProps" :vueFlowInstanceId="vueFlowInstanceId" />
        </template>
        <!-- 自定义连线 -->
        <template v-for="item in customEdges" #[item.name]="edgeProps" :key="item.name">
          <component :is="item.component" v-bind="edgeProps" :vueFlowInstanceId="vueFlowInstanceId" />
        </template>

        <!-- 背景 -->
        <Background pattern-color="#aaa" :gap="8" />
        <!-- 缩略图 -->
        <MiniMap :width="180" :height="120" :position="PanelPosition.TopRight" pannable zoomable />
        <!-- 控件 -->
        <Controls :position="PanelPosition.TopLeft" />
        <!-- 辅助线 -->
        <!-- <helperLines :horizontal="helperLineHorizontal" :vertical="helperLineVertical" :vueFlowInstanceId="vueFlowInstanceId" /> -->

        <!--  -->
        <Panel :position="PanelPosition.BottomRight">
          <t-button @click="onAddNode">Add a node</t-button>
          <t-button @click="onAddNodes">Add a nodes</t-button>
        </Panel>
      </VueFlow>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vueFlow {
  height: 100%;
  padding: 12px;
  display: flex;
  gap: 12px;
  .sidebarContainer {
    background-color: var(--td-bg-color-container);
    width: 240px;
  }
  .vueFlowContainer {
    height: 100%;
    flex: 1;
    background-color: var(--td-bg-color-container);
    border-radius: 4px;
    overflow: auto;
  }
}
</style>
