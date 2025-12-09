import { ElementData, Styles } from '@vue-flow/core'
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
