import { Node, Edge, ElementData, Styles, GraphNode, GraphEdge } from '@vue-flow/core'
import { Component } from 'vue'

// 自定义节点类型
export interface CustomNodeType {
  name: string
  component: Component
}

// 节点的业务数据类型
export interface nodeDataType extends ElementData {
  name: string
}

// 左侧侧边栏树组件
export interface SidebarTreeType {
  id: string
  /** 用于左侧树展示名称的 */
  label: string
  /** 图标 */
  icon?: string
  /** 添加的元素的形状 */
  shape: string
  /** 节点还是连线 */
  type: 'node' | 'edge'
  /** 节点的业务数据 */
  data?: { name?: string } & Record<string, any>
  /** 节点的宽度和高度 */
  width?: number
  height?: number
  style?: Styles
  children?: SidebarTreeType[]
}

/** vueFlowEditor组件参数 */
export interface vueFlowEditorProps {
  /** vueFlow实例id */
  vueFlowInstanceId?: string
  /** 侧边栏数据 */
  sidebarData?: SidebarTreeType[]
  /** 节点数据 */
  nodes?: Node[]
  /** 连线数据 */
  edges?: Edge[]
  /** 自定义节点 */
  customNodes?: CustomNodeType[]
  /** 自定义连线 */
  customEdges?: CustomNodeType[]
}

/** vueFlowEditor 触发事件 */
export interface vueFlowEditorEmitType {
  addNode: [newNode: GraphNode]
  removeNode: [node: GraphNode]
  addEdge: [newEdge: GraphEdge]
  removeEdge: [edge: GraphEdge]
}
