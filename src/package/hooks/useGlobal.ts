import { EdgeMouseEvent, NodeMouseEvent, OnConnectStartParams } from '@vue-flow/core'

// 是否正在连线
const isConnecting = ref<{ event?: MouseEvent | TouchEvent } & OnConnectStartParams>(null)
// 鼠标是否在节点上
const isMouseOnNode = ref<NodeMouseEvent>(null)
// 节点是否双击了
const isNodeDoubleClick = ref<NodeMouseEvent>(null)
// 连线是否双击了
const isEdgeDoubleClick = ref<EdgeMouseEvent>(null)

export const useVueFlowGlobal = () => {
  return { isConnecting, isMouseOnNode, isNodeDoubleClick, isEdgeDoubleClick }
}
