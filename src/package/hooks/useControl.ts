import { NodeChange, useVueFlow } from '@vue-flow/core'
import { emitRetuenType } from '../emitReturnType'
import { vueFlowEditorEmitType } from '../type'
import { useDropToParent } from './useDropToParent'
import { groupLog } from '../utils'
import { useVueFlowGlobal } from './useGlobal'
import { useDragAndDrop } from './useDnD'
import { baseCustomShape } from '../shape'

/** 一些事件的控制全部统一放置在这里 */
export const useControl = (vueFlowInstanceId: string, Emit: emitRetuenType<vueFlowEditorEmitType>) => {
  const isInit = ref(false)

  // 这里用于log一下事件
  const emit: emitRetuenType<vueFlowEditorEmitType> = (type, params) => {
    if (!isInit.value) return
    // @ts-ignore
    Emit(type, params)
  }

  const {
    addEdges,
    onInit,
    onConnect,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onConnectStart,
    onConnectEnd,
    onEdgeUpdate,
    onNodesChange,
    onEdgesChange,
    updateEdge,
    findNode,
    findEdge,
    onNodeDoubleClick,
    onEdgeDoubleClick,
    connectionLineOptions,
  } = useVueFlow(vueFlowInstanceId)

  // 一些全局的状态
  const { isMouseOnNode, isConnecting, isNodeDoubleClick, isEdgeDoubleClick } = useVueFlowGlobal()
  onNodeMouseEnter((params) => {
    isMouseOnNode.value = params
  })
  onNodeMouseLeave(() => {
    isMouseOnNode.value = null
  })
  onConnectStart((params) => {
    isConnecting.value = params
  })
  onConnectEnd(() => {
    isConnecting.value = null
  })
  onNodeDoubleClick((params) => {
    isNodeDoubleClick.value = params
  })
  onEdgeDoubleClick((params) => {
    isEdgeDoubleClick.value = params
  })

  // 开启 父子级拖拽 功能
  useDropToParent(
    vueFlowInstanceId,
    (node) => {
      emit('dropIn', node)
    },
    (node) => {
      emit('dropOut', node)
    },
  )

  // 开启 拖拽新增 功能
  const { onDragOver, onDrop, onDragLeave } = useDragAndDrop(vueFlowInstanceId, (node) => {
    emit('addNode', node)
  })

  //  开启手动连线
  onConnect((params) => {
    addEdges([params])
  })
  // 开启重连线
  onEdgeUpdate((params) => {
    const edge = updateEdge(params.edge, params.connection, false)
    emit('reconnectEdge', edge)
  })

  // 节点变化
  onNodesChange((nodeChanges: NodeChange[]) => {
    nodeChanges.forEach((change) => {
      if (change.type === 'dimensions') {
        emit('resizeNode', findNode(change.id))
      } else if (change.type === 'position') {
        emit('moveNode', findNode(change.id))
      } else if (change.type === 'remove') {
        // emit('removeNode', findNode(change.id))
      } else if (change.type === 'select') {
        emit('selectNode', findNode(change.id))
      }
      // @ts-ignore 自定义的重命名事件
      else if (change.type === 'renameNode') {
        // @ts-ignore
        emit('renameNode', change.node)
      }
    })
  })

  // 连线变化
  onEdgesChange((edgeChanges) => {
    edgeChanges.forEach((change) => {
      if (change.type === 'add') {
        const edge = findEdge(change.item.id)
        // 赋值认连线样式
        Object.assign(edge, {
          // 这里提供一个默认的连线type
          type: baseCustomShape.baseEdge,
          ...connectionLineOptions.value,
        })
        emit('addEdge', edge)
      } else if (change.type === 'remove') {
        // emit('removeEdge', findEdge(change.id))
      } else if (change.type === 'select') {
        emit('selectEdge', findEdge(change.id))
      }
      // @ts-ignore 自定义的重命名事件
      else if (change.type === 'renameEdge') {
        // @ts-ignore
        emit('renameEdge', change.edge)
      }
    })
  })

  // 初始化完成
  onInit((instance) => {
    groupLog('onInit', instance)
    isInit.value = true
  })

  return {
    onDragOver,
    onDrop,
    onDragLeave,
  }
}
