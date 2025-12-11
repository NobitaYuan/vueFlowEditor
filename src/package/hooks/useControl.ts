import { NodeChange, useVueFlow } from '@vue-flow/core'
import { emitRetuenType } from '../emitReturnType'
import { vueFlowEditorEmitType } from '../type'
import { useDropToParent } from './useDropToParent'
import { groupLog } from '../utils'
import { useVueFlowGlobal } from './useGlobal'
import { useDragAndDrop } from './useDnD'
import { debounce } from 'lodash'

/** 一些事件的控制全部统一放置在这里 */
export const useControl = (vueFlowInstanceId: string, Emit: emitRetuenType<vueFlowEditorEmitType>) => {
  const isInit = ref(false)
  const debounceGroupLog = debounce(groupLog, 300)

  // 这里用于log一下事件
  const emit: emitRetuenType<vueFlowEditorEmitType> = (type, params) => {
    if (!isInit.value) return
    // @ts-ignore
    Emit(type, params)
    if (type === 'moveNode' || type === 'resizeNode') {
      debounceGroupLog('emit：' + type, params)
    } else {
      groupLog('emit：' + type, params)
    }
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
  } = useVueFlow(vueFlowInstanceId)

  // 一些全局的状态
  const { isMouseOnNode, isConnecting } = useVueFlowGlobal()
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
    updateEdge(params.edge, params.connection)
    emit('reconnectEdge', params)
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
    })
  })

  // 连线变化
  onEdgesChange((edgeChanges) => {
    edgeChanges.forEach((change) => {
      if (change.type === 'add') {
        emit('addEdge', findEdge(change.item.id))
      } else if (change.type === 'remove') {
        // emit('removeEdge', findEdge(change.id))
      } else if (change.type === 'select') {
        emit('selectEdge', findEdge(change.id))
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
