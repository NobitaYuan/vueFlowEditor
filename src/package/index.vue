<script lang="ts" setup>
// 必要样式
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/node-resizer/dist/style.css'
// 初始化样式
import './style/index.css'

// vueFlow
import { VueFlow, Panel, PanelPosition, useVueFlow } from '@vue-flow/core'

// vueFlow组件
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

// 自定义节点连线组件
import baseNode from './shape/node/baseNode.vue'
import baseEdge from './shape/edge/baseEdge.vue'
import ClassNode from './shape/node/class.vue'

// 扩展逻辑
import { useControl } from './hooks'
import { baseCustomShape } from './shape'
import sidebar from './components/sidebar.vue'
import { vueFlowEditorEmitType, vueFlowEditorProps } from './type'
import contextmenu from './components/contextmenu.vue'
import { useContextmenu } from './hooks/useContextmenu'

// Props
const Props = withDefaults(defineProps<vueFlowEditorProps>(), {
  vueFlowInstanceId: undefined,
  sidebarData: () => [],
  nodes: () => [],
  edges: () => [],
  customNodes: () => [],
  customEdges: () => [],
})

// emit
const Emit = defineEmits<vueFlowEditorEmitType>()

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
    .map((item) => ({ ...item, name: 'node-' + item.name }))
  return baseCustomNodes
})

// 自定义连线
const customEdges = computed(() => {
  const baseCustomEdges = [{ name: baseCustomShape.baseEdge, component: markRaw(baseEdge) }, ...Props.customEdges]
    // 这里是处理一下name
    .map((item) => ({ ...item, name: 'edge-' + item.name }))
  return baseCustomEdges
})

const nodes = computed(() => Props.nodes)
const edges = computed(() => Props.edges)

const { addNodes } = useVueFlow(vueFlowInstanceId)

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

// 所有操作
const { onDragOver, onDrop, onDragLeave } = useControl(vueFlowInstanceId, Emit)
// 右键事件
const { popupPosition, popupShow, menuList } = useContextmenu(vueFlowInstanceId, Props, Emit)

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
      <VueFlow :id="vueFlowInstanceId" :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave" edgesUpdatable>
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
        <slot name="default">
          <Panel :position="PanelPosition.BottomRight">
            <t-button @click="onAddNode">Add a node</t-button>
            <t-button @click="onAddNodes">Add a nodes</t-button>
          </Panel>
        </slot>
      </VueFlow>
      <contextmenu v-model="popupShow" :position="popupPosition" :menuList="menuList" />
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
    width: 200px;
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
