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
}

export function useDragAndDrop(vueFlowInstanceId: string, afterAdd: (node: GraphNode) => void) {
  const { draggedData, isDragOver, isDragging } = state

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode, findNode } = useVueFlow(vueFlowInstanceId)

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  function onDragStart(event: DragEvent, dragData: SidebarTreeType) {
    if (dragData.type !== 'node') return

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
      }
      // const target = event.target as HTMLElement
      // const targetNodeId = target.getAttribute('data-id')
      // const targetNode = getNodes.value.find((node) => node.id === targetNodeId)
      // if (targetNode) {
      //   targetNode.selected = true
      // }
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
