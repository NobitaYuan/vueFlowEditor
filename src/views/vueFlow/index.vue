<script lang="ts" setup>
import { vueFlowEditor, baseCustomShape, SidebarTreeType } from '@/package/index'
import type { Node, Edge, GraphNode } from '@/package/index'

const sidebarData = ref<SidebarTreeType[]>([
  {
    id: '0',
    label: '开始事件',
    type: 'node',
    icon: 'bz',
    data: {
      name: '节点0',
    },
    children: [
      {
        id: '0-1',
        label: '开始事件',
        icon: 'bz',
        iconColor: '#10b981',
        type: 'node',
        shape: baseCustomShape.class,
        data: {
          name: '开始事件',
        },
      },
      // 信号开始事件
      {
        id: '0-2',
        label: '信号开始事件',
        type: 'node',
        shape: baseCustomShape.class,
        data: {
          name: '信号开始事件',
        },
      },
    ],
  },
  // 任务
  {
    id: '1',
    label: '任务',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '任务',
    },
    children: [
      {
        id: '1-1',
        label: '用户任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '用户任务',
        },
      },
      {
        id: '1-2',
        label: '决策任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '决策任务',
        },
      },
      {
        id: '1-3',
        label: 'Http任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: 'Http任务',
        },
      },
      {
        id: '1-4',
        label: 'AIP任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: 'AIP任务',
        },
      },
      {
        id: '1-5',
        label: '脚本任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '脚本任务',
        },
      },
      {
        id: '1-6',
        label: '手动任务',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '手动任务',
        },
      },
    ],
  },
  {
    id: '2',
    label: '网关',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '网关',
    },
    children: [
      {
        id: '2-1',
        label: '排他网关',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '排他网关',
        },
      },
      {
        id: '2-2',
        label: '并行网关',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '并行网关',
        },
      },
      {
        id: '2-3',
        label: '包容网关',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '包容网关',
        },
      },
      {
        id: '2-4',
        label: '事件网关',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '事件网关',
        },
      },
    ],
  },
  {
    id: '3',
    label: '中间事件',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '中间事件',
    },
    children: [
      {
        id: '3-1',
        label: '捕获事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '捕获事件',
        },
      },
      {
        id: '3-2',
        label: '抛出事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '抛出事件',
        },
      },
    ],
  },
  {
    id: '4',
    label: '子流程',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '子流程',
    },
    children: [
      {
        id: '4-1',
        label: '内嵌子流程',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '内嵌子流程',
        },
      },
    ],
  },
  {
    id: '5',
    label: '边间事件',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '边间事件',
    },
    children: [
      {
        id: '5-1',
        label: '错误边界事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '错误边界事件',
        },
      },
      {
        id: '5-2',
        label: '定时器边界事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '定时器边界事件',
        },
      },
      {
        id: '5-3',
        label: '取消边界事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '取消边界事件',
        },
      },
      {
        id: '5-4',
        label: '补偿边界事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '补偿边界事件',
        },
      },
    ],
  },
  {
    id: '6',
    label: '结束事件',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '结束事件',
    },
    children: [
      {
        id: '6-1',
        label: '结束事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '结束事件',
        },
      },
      {
        id: '6-2',
        label: '错误结束事件',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '错误结束事件',
        },
      },
    ],
  },
  {
    id: '7',
    label: '泳道',
    type: 'node',
    shape: baseCustomShape.baseNode,
    data: {
      name: '泳道',
    },
    children: [
      {
        id: '7-1',
        label: '泳道',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '泳道',
        },
      },
      {
        id: '7-2',
        label: '泳道2',
        type: 'node',
        shape: baseCustomShape.baseNode,
        data: {
          name: '泳道',
        },
      },
    ],
  },
])

const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1',
    type: baseCustomShape.class,
    position: { x: 150, y: 250 },
    width: 300,
    height: 300,
    data: { name: 'Node 1' },
    style: {},
  },
  {
    id: '1-1',
    type: baseCustomShape.class,
    width: 200,
    height: 200,
    position: { x: 10, y: 10 },
    data: { name: 'Node 1-1' },
    // expandParent: true,
    parentNode: '1',
  },
  {
    id: '1-2',
    type: baseCustomShape.class,
    position: { x: 10, y: 80 },
    width: 100,
    height: 100,
    data: { name: 'Node 1-2' },
    // extent: 'parent',
    parentNode: '1-1',
  },
  {
    id: '3',
    type: baseCustomShape.class,
    position: { x: 300, y: 600 },
    data: { label: 'Node 3' },
    style: {},
  },
  {
    id: '4',
    type: baseCustomShape.class, // <-- this is the custom node type name
    position: { x: 500, y: 280 },
    width: 200,
    height: 200,
    data: {
      name: 'Node 4',
      hello: 'world',
    },
    style: {},
  },
  {
    id: '5',
    type: baseCustomShape.class, // <-- this is the custom node type name
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
    type: baseCustomShape.baseEdge,
    source: '3',
    target: '4',
    data: {
      name: 'world',
    },
  },
])

const vueFlowEditorRef = ref<InstanceType<typeof vueFlowEditor>>()

const renameNode = (node: GraphNode) => {
  console.log('renameNode', node)
}
</script>

<template>
  <div class="vueFlowPlay">
    <vueFlowEditor ref="vueFlowEditorRef" @rename-node="renameNode" :sidebarData="sidebarData" :nodes="nodes" :edges="edges" />
  </div>
</template>

<style lang="scss" scoped>
.vueFlowPlay {
  height: 100%;
}
</style>
