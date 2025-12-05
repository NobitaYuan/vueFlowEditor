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
import type { Node, Edge, NodeTypesObject, EdgeTypesObject } from '@vue-flow/core'

// vueFlow组件
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

// 自定义节点连线组件
import baseNode from './shape/node/baseNode.vue'
import baseEdge from './shape/edge/baseEdge.vue'
import ClassNode from './shape/node/class.vue'

//
import { useVueFlowGlobal } from './hooks'
import { customShape } from './shape'

interface IProps {
  vueFlowInstanceId: string
}
const Props = withDefaults(defineProps<IProps>(), {
  vueFlowInstanceId: 'VueFlowEditor',
})

const vueFlowInstanceId = Props.vueFlowInstanceId

// 自定义节点
const customNodes: NodeTypesObject = {
  [customShape.baseNode]: markRaw(baseNode),
  [customShape.class]: markRaw(ClassNode),
}
// 自定义连线
const customEdges: EdgeTypesObject = {
  [customShape.baseEdge]: markRaw(baseEdge),
}

const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
  {
    id: '3',
    type: 'output',
    position: { x: 300, y: 200 },
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
    width: 200,
    height: 200,
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
    source: '2',
    target: '3',
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

const { addNodes, addEdges, onInit, onConnect, onNodeClick, onNodeMouseEnter, onNodeMouseLeave, onConnectStart, onConnectEnd } = useVueFlow(vueFlowInstanceId)

const { isMouseOnNode, isConnecting } = useVueFlowGlobal()

function generateRandomNode() {
  const id = Math.random().toString()
  return {
    id,
    position: { x: Math.random() * 1500, y: Math.random() * 1500 },
    width: 100,
    height: 100,
    type: customShape.baseNode,
    label: 'Random Node' + id,
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
  console.log('onNodeMouseEnter', params)
  isMouseOnNode.value = params
  // addBaseNodeState(nodeData)
})
onNodeMouseLeave((params) => {
  console.log('onNodeMouseLeave', params)
  isMouseOnNode.value = null
  // addBaseNodeState(nodeData)
})

onConnectStart((params) => {
  console.log('onConnectStart', params)
  isConnecting.value = params
})
onConnectEnd((params) => {
  console.log('onConnectEnd', params)
  isConnecting.value = null
})

onInit((instance) => {
  console.log('onInit', instance)
})
</script>

<template>
  <div class="vueFlow">
    <div class="vueFlowContainer">
      <VueFlow :id="vueFlowInstanceId" :nodes="nodes" :edges="edges" :nodeTypes="customNodes" :edgeTypes="customEdges">
        <!-- 背景 -->
        <Background pattern-color="#aaa" :gap="8" />
        <!-- 缩略图 -->
        <MiniMap :width="180" :height="120" :position="PanelPosition.TopRight" pannable zoomable />
        <!-- 控件 -->
        <Controls :position="PanelPosition.TopLeft" />

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
  .vueFlowContainer {
    height: 100%;
    background-color: var(--td-bg-color-container);
    border-radius: 4px;
    overflow: auto;
  }
}
</style>
