import { GraphNode, useVueFlow } from '@vue-flow/core'

// 处理拖动节点到父节点
export const useDropToParent = (vueFlowInstanceId: string) => {
  const { nodes, onNodeDrag, onNodeDragStop, screenToFlowCoordinate, addSelectedNodes } = useVueFlow(vueFlowInstanceId)

  // 当前要拖拽进入的父节点
  const curParentNode = ref<GraphNode>()

  //  拖拽开始
  onNodeDrag((params) => {
    const { event, node: curNode } = params
    if (!curNode) return
    curParentNode.value = undefined
    // 鼠标的位置
    const pointerPosition = screenToFlowCoordinate({
      // @ts-ignore
      x: event.clientX,
      // @ts-ignore
      y: event.clientY,
    })
    // 根据位置去寻找节点
    const findedNodes = nodes.value.filter((node) => {
      if (node.id === curNode?.id) return false
      const xRange = [node.computedPosition.x, node.computedPosition.x + Number(node.dimensions.width)]
      const yRange = [node.computedPosition.y, node.computedPosition.y + Number(node.dimensions.height)]
      if (pointerPosition.x >= xRange[0] && pointerPosition.x <= xRange[1] && pointerPosition.y >= yRange[0] && pointerPosition.y <= yRange[1]) {
        return node
      }
    })
    if (!findedNodes.length) {
      addSelectedNodes([curNode])
      return
    }
    // z轴最大的
    const maxZIndexNode = findedNodes.reduce((pre, cur) => {
      return pre.zIndex > cur.zIndex ? pre : cur
    })
    curParentNode.value = maxZIndexNode
    addSelectedNodes([curParentNode.value, curNode])
  })

  //  拖拽结束
  onNodeDragStop((params) => {
    const curNode = params.node
    if (!curNode) return
    addSelectedNodes([curNode])
    // 当前要更新的节点
    const nodeToUpdate = nodes.value.find((node) => node.id === curNode.id)
    if (nodeToUpdate.parentNode === curParentNode.value?.id) {
      return
    }
    // 如果有父节点，就更新父节点
    if (curParentNode.value) {
      // removeSelectedNodes([curParentNode.value])
      nodeToUpdate.parentNode = curParentNode.value?.id
      nodeToUpdate.position = {
        x: curNode.computedPosition.x - curParentNode.value.computedPosition.x,
        y: curNode.computedPosition.y - curParentNode.value.computedPosition.y,
      }
    }
    // 如果没有父节点
    else {
      // 如果本来就有父节点的，则删除
      if (nodeToUpdate.parentNode) {
        nodeToUpdate.parentNode = undefined
        nodeToUpdate.position = {
          x: curNode.computedPosition.x,
          y: curNode.computedPosition.y,
        }
      }
    }
  })
}
