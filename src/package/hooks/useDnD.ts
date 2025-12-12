import { useVueFlow } from '@vue-flow/core'
import type { GraphNode, Node } from '@vue-flow/core'
import { SidebarTreeType } from '../type'
import { uniqueId } from 'lodash'

/**  A unique id. */
function getId() {
  return uniqueId('dragAddNewNode_')
}

/**
 * In a real world scenario you'd want to avoid creating refs in a global scope like this as they might not be cleaned up properly.
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedData: ref<SidebarTreeType>(null),
  isDragOver: ref(false),
  isDragging: ref(false),
  curParentNode: ref<GraphNode>(),
}

export function useDragAndDrop(vueFlowInstanceId: string, afterAdd?: (node: GraphNode) => void) {
  const { draggedData, isDragOver, isDragging } = state

  const { nodes, addNodes, screenToFlowCoordinate, addSelectedNodes, onNodesInitialized, updateNode, findNode } = useVueFlow(vueFlowInstanceId)

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event: DragEvent, dragData: SidebarTreeType) {
    if (dragData.type !== 'node') return
    state.curParentNode.value = undefined

    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', JSON.stringify(dragData))
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedData.value = JSON.parse(JSON.stringify(dragData))
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event: DragEvent) {
    event.preventDefault()
    if (draggedData.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
        // 聚焦当前是否有父节点
        state.curParentNode.value = findCurPositonNode(event, nodes.value)
        if (state.curParentNode.value) {
          addSelectedNodes([state.curParentNode.value])
        } else {
          addSelectedNodes([])
        }
      }
    }
  }

  function onDragLeave() {
    isDragOver.value = false
  }

  function onDragEnd() {
    isDragging.value = false
    isDragOver.value = false
    draggedData.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  /** Handles the drop event. */
  function onDrop(event: DragEvent) {
    if (!draggedData.value) return
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = getId()

    const newNode: Node = {
      id: nodeId,
      type: draggedData.value.shape,
      position,
      width: draggedData.value.width || 200,
      height: draggedData.value.height || 100,
      data: draggedData.value.data,
      style: draggedData.value.style,
    }
    // 判断是否有父节点
    if (state.curParentNode.value) {
      newNode.parentNode = state.curParentNode.value.id
      newNode.position = {
        // 这里是拿当前节点的位置减去父节点的位置，算出相对于父节点的位置
        x: newNode.position.x - state.curParentNode.value.computedPosition.x,
        y: newNode.position.y - state.curParentNode.value.computedPosition.y,
      }
    }
    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => {
        return {
          position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 4 },
        }
      })
      if (afterAdd && afterAdd instanceof Function) {
        afterAdd(findNode(nodeId))
      }
      off()
    })
    addNodes(newNode)
  }

  // 根据鼠标的位置去寻找节点
  const findCurPositonNode = (event: DragEvent, allNodes: GraphNode[]) => {
    // 鼠标的位置
    const pointerPosition = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })
    // 根据位置去寻找节点
    const findedNodes = allNodes.filter((node) => {
      const xRange = [node.computedPosition.x, node.computedPosition.x + Number(node.dimensions.width)]
      const yRange = [node.computedPosition.y, node.computedPosition.y + Number(node.dimensions.height)]
      if (pointerPosition.x >= xRange[0] && pointerPosition.x <= xRange[1] && pointerPosition.y >= yRange[0] && pointerPosition.y <= yRange[1]) {
        return node
      }
    })
    if (!findedNodes.length) {
      return undefined
    }
    // z轴最大的
    const maxZIndexNode = findedNodes.reduce((pre, cur) => {
      return pre.zIndex > cur.zIndex ? pre : cur
    })
    return maxZIndexNode
  }

  return {
    draggedData,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
