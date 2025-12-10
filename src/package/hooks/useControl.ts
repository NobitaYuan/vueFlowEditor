import { NodeChange, useVueFlow } from '@vue-flow/core'
import { emitRetuenType } from '../emitReturnType'
import { vueFlowEditorEmitType } from '../type'
import { useDropToParent } from './useDropToParent'
import { groupLog } from '../utils'
import { useVueFlowGlobal } from './useGlobal'
import { useDragAndDrop } from './useDnD'

/** 一些事件的控制全部统一放置在这里 */
export const useControl = (vueFlowInstanceId: string, emit: emitRetuenType<vueFlowEditorEmitType>) => {
  // 一些全局的状态
  const { isMouseOnNode, isConnecting } = useVueFlowGlobal()

  // 开启 父子级拖拽 功能
  useDropToParent(vueFlowInstanceId)

  // 开启 拖拽新增 功能
  const { onDragOver, onDrop, onDragLeave } = useDragAndDrop(vueFlowInstanceId, emit)

  const {
    addEdges,
    onInit,
    onConnect,
    onNodeClick,
    onEdgeClick,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onConnectStart,
    onConnectEnd,
    onNodesChange,
    onEdgesChange,
  } = useVueFlow(vueFlowInstanceId)
  //  开启手动连线
  onConnect((params) => {
    addEdges([params])
  })

  onNodeMouseEnter((params) => {
    isMouseOnNode.value = params
  })
  onNodeMouseLeave(() => {
    isMouseOnNode.value = null
  })
  onConnectStart((params) => {
    isConnecting.value = params
  })
  onConnectEnd((params) => {
    isConnecting.value = null
  })

  onInit((instance) => {
    groupLog('onInit', instance)
  })

  // 节点变化
  onNodesChange((nodeChanges: NodeChange[]) => {
    nodeChanges.forEach((change) => {
      if (change.type === 'dimensions') {
        console.log('dimensionsChange', change)
      } else if (change.type === 'position') {
        console.log('positionChange', change)
      }
    })
  })

  // 连线变化
  onEdgesChange((edgeChanges) => {
    edgeChanges.forEach((change) => {
      if (change.type === 'add') {
        emit('addEdge', change.item)
      } else if (change.type === 'remove') {
        emit('removeEdge', change)
      }
    })
  })

  return {
    onDragOver,
    onDrop,
    onDragLeave,
  }
}
