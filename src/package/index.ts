// 基础自定义节点的模板
import baseNodeTemplate from './shape/node/baseNode.vue'
import baseEdgeTemplate from './shape/edge/baseEdge.vue'
// 基础的名称修改器组件
import nameEditor from './shape/node/components/nameEditor.vue'
// 编辑器组件
import vueFlowEditor from './index.vue'

export * from '@vue-flow/core'
export * from './shape/index'
export * from './type'

// 导出
export { baseNodeTemplate }
export { baseEdgeTemplate }
export { nameEditor }
export { vueFlowEditor }
