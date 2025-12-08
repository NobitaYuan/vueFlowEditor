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
import type { Node, Edge, NodeChange, GraphNode } from '@vue-flow/core'

// vueFlow组件
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

// 自定义节点连线组件
import baseNode from './shape/node/baseNode.vue'
import baseEdge from './shape/edge/baseEdge.vue'
import ClassNode from './shape/node/class.vue'

//
import { useVueFlowGlobal, useDropToParent, useDragAndDrop } from './hooks'
import { customShape } from './shape'
import sidebar from './components/sidebar.vue'
import { getHelperLines } from './utils'
import helperLines from './components/helperLines.vue'

interface IProps {
  vueFlowInstanceId: string
}
const Props = withDefaults(defineProps<IProps>(), {
  vueFlowInstanceId: 'VueFlowEditor',
})

const vueFlowInstanceId = Props.vueFlowInstanceId
/* 
{
  [customShape.baseNode]: markRaw(baseNode),
  [customShape.class]: markRaw(ClassNode),
}
*/
// 自定义节点
const customNodes = [
  {
    name: 'node-' + customShape.baseNode,
    component: markRaw(baseNode),
  },
  {
    name: 'node-' + customShape.class,
    component: markRaw(ClassNode),
  },
]

/* 
 EdgeTypesObject = {
  [customShape.baseEdge]: markRaw(baseEdge),
}
*/
// 自定义连线
const customEdges = [
  {
    name: 'edge-' + customShape.baseEdge,
    component: markRaw(baseEdge),
  },
]

const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1',
    type: customShape.class,
    position: { x: 150, y: 250 },
    width: 300,
    height: 300,
    data: { name: 'Node 1' },
  },
  {
    id: '1-1',
    type: customShape.class,
    width: 200,
    height: 200,
    position: { x: 10, y: 10 },
    data: { name: 'Node 1-1' },
    // expandParent: true,
    parentNode: '1',
  },
  {
    id: '1-2',
    type: customShape.class,
    position: { x: 10, y: 80 },
    width: 100,
    height: 100,
    data: { name: 'Node 2' },
    // extent: 'parent',
    parentNode: '1-1',
  },
  {
    id: '3',
    type: 'output',
    position: { x: 300, y: 600 },
    data: { label: 'Node 3' },
  },
  {
    id: '4',
    type: customShape.baseNode, // <-- this is the custom node type name
    position: { x: 500, y: 280 },
    width: 200,
    height: 200,
    data: {
      name: 'Node 4',
      hello: 'world',
    },
  },
  {
    id: '5',
    type: customShape.class, // <-- this is the custom node type name
    position: { x: 500, y: 500 },
    width: 150,
    height: 150,
    data: {
      name: '作战任务',
      hello: 'world',
    },
  },
])

const edges = ref<Edge[]>([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  },
  {
    id: 'e2->3',
    source: '1-1',
    target: '1-2',
    zIndex: 999,
    animated: true,
  },
  {
    id: 'e3->4',
    type: customShape.baseEdge,
    source: '3',
    target: '4',
    data: {
      name: 'world',
    },
  },
])

const {
  addNodes,
  addEdges,
  onInit,
  onConnect,
  onNodeClick,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onConnectStart,
  onConnectEnd,
  onNodesChange,
  applyNodeChanges,
} = useVueFlow(vueFlowInstanceId)

const { isMouseOnNode, isConnecting } = useVueFlowGlobal()

function generateRandomNode() {
  const id = Math.random().toString()
  return {
    id,
    position: { x: Math.random() * 1500, y: Math.random() * 1500 },
    width: 100,
    height: 100,
    type: customShape.class,
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

onConnect((params) => {
  console.log('onConnect', params)
  addEdges([params])
})

onNodeClick((params) => {
  console.log('onNodeClick', params)
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
onConnectEnd((params) => {
  console.log('onConnectEnd', params)
  isConnecting.value = null
})

useDropToParent(vueFlowInstanceId)

onInit((instance) => {
  console.log('onInit', instance)
})

const { onDragOver, onDrop, onDragLeave } = useDragAndDrop(vueFlowInstanceId)

// 辅助线逻辑
const helperLineHorizontal = ref<number | undefined>(undefined)
const helperLineVertical = ref<number | undefined>(undefined)
function updateHelperLines(changes: NodeChange[], nodes: GraphNode[]) {
  helperLineHorizontal.value = undefined
  helperLineVertical.value = undefined

  if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
    const helperLines = getHelperLines(changes[0], nodes)

    // if we have a helper line, we snap the node to the helper line position
    // this is being done by manipulating the node position inside the change object
    changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x
    changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y

    // if helper lines are returned, we set them so that they can be displayed
    helperLineHorizontal.value = helperLines.horizontal
    helperLineVertical.value = helperLines.vertical
  }

  return changes
}

function onNodeChange(changes: NodeChange[]) {
  const updatedChanges = updateHelperLines(changes, nodes.value as GraphNode[])
  nodes.value = applyNodeChanges(updatedChanges)
}
onNodesChange(onNodeChange)
</script>

<template>
  <div class="vueFlow">
    <div class="sidebarContainer">
      <sidebar :vueFlowInstanceId="vueFlowInstanceId" />
    </div>
    <div class="vueFlowContainer" @drop="onDrop">
      <VueFlow :id="vueFlowInstanceId" :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave">
        <!-- 自定义节点 -->
        <template v-for="item in customNodes" #[item.name]="nodeProps" :key="item.name">
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
        <helperLines :horizontal="helperLineHorizontal" :vertical="helperLineVertical" :vueFlowInstanceId="vueFlowInstanceId" />

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
