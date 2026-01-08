import { useVueFlow } from '@vue-flow/core'
import { contextmenuItem, vueFlowEditorEmitType, vueFlowEditorProps } from '../type'
import { emitRetuenType } from '../emitReturnType'

export const useContextmenu = (vueFlowInstanceId: string, Props: vueFlowEditorProps, Emit: emitRetuenType<vueFlowEditorEmitType>) => {
  // 是否右键菜单
  const popupShow = ref(false)
  // 右键菜单的位置
  const popupPosition = ref({ x: 0, y: 0 })
  // 菜单的列表
  const menuList = ref<contextmenuItem[]>([])

  const { onNodeContextMenu, onEdgeContextMenu, removeNodes, removeEdges } = useVueFlow(vueFlowInstanceId)

  // 这里用于log一下事件
  const emit: emitRetuenType<vueFlowEditorEmitType> = (type, params) => {
    // @ts-ignore
    Emit(type, params)
  }

  onNodeContextMenu((params) => {
    const { node } = params
    const event = params.event as PointerEvent
    event.preventDefault()
    popupPosition.value = { x: event.clientX, y: event.clientY }
    menuList.value = [
      {
        name: '删除节点',
        onClick: () => {
          removeNodes([node], false, false)
          emit('removeNode', node)
        },
      },
      {
        name: '上移一层',
        onClick: () => {
          if (node.zIndex) {
            node.zIndex = node.zIndex + 1
          } else {
            node.zIndex = 1
          }
          emit('updateNodeZIndex', node)
        },
      },
      {
        name: '下移一层',
        disabled: !node.zIndex,
        onClick: () => {
          if (node.zIndex) {
            node.zIndex = node.zIndex - 1
          } else {
            node.zIndex = 1
          }
          emit('updateNodeZIndex', node)
        },
      },
    ]
    let show
    if (Props.onNodeContextmenu) {
      show = Props.onNodeContextmenu(params, menuList.value, popupShow.value)
    }
    if (show === false) {
      return
    }
    popupShow.value = true
  })

  onEdgeContextMenu((params) => {
    const { edge } = params
    const event = params.event as PointerEvent
    event.preventDefault()
    popupPosition.value = { x: event.clientX, y: event.clientY }
    menuList.value = [
      {
        name: '删除连线',
        onClick: () => {
          removeEdges([edge])
          emit('removeEdge', edge)
        },
      },
      {
        name: '上移一层',
        onClick: () => {
          if (edge.zIndex) {
            edge.zIndex = edge.zIndex + 1
          } else {
            edge.zIndex = 1
          }
          emit('updateEdgeZIndex', edge)
        },
      },
      {
        name: '下移一层',
        disabled: !edge.zIndex,
        onClick: () => {
          if (edge.zIndex) {
            edge.zIndex = edge.zIndex - 1
          } else {
            edge.zIndex = 1
          }
          emit('updateEdgeZIndex', edge)
        },
      },
    ]
    let show
    if (Props.onEdgeContextmenu) {
      show = Props.onEdgeContextmenu(params, menuList.value, popupShow.value)
    }
    if (show === false) {
      return
    }
    popupShow.value = true
  })

  return { popupShow, popupPosition, menuList }
}
