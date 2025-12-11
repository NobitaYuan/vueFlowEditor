import { NodeMouseEvent, OnConnectStartParams } from '@vue-flow/core'

// 是否正在连线
const isConnecting = ref<{ event?: MouseEvent | TouchEvent } & OnConnectStartParams>(null)
// 鼠标是否在节点上
const isMouseOnNode = ref<NodeMouseEvent>(null)
// 是否双击了
const isDoubleClick = ref<NodeMouseEvent>(null)

export const useVueFlowGlobal = () => {
  return { isConnecting, isMouseOnNode, isDoubleClick }
}
