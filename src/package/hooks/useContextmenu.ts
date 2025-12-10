import { GraphEdge, useVueFlow } from '@vue-flow/core'
import { contextmenuItem, vueFlowEditorProps } from '../type'

export const useContextmenu = (vueFlowInstanceId: string, Props: vueFlowEditorProps) => {
  // 是否右键菜单
  const popupShow = ref(false)
  // 右键菜单的位置
  const popupPosition = ref({ x: 0, y: 0 })
  // 菜单的列表
  const menuList = ref<contextmenuItem[]>([])

  const { onNodeContextMenu, onEdgeContextMenu, removeNodes } = useVueFlow(vueFlowInstanceId)

  onNodeContextMenu((params) => {
    const { node } = params
    const event = params.event as PointerEvent
    event.preventDefault()
    console.log('event', event)
    popupPosition.value = { x: event.clientX, y: event.clientY }
    menuList.value = [
      {
        name: '删除',
        onClick: () => {
          console.log('node删除', node)
        },
      },
    ]
    if (Props.onNodeContextmenu) {
      Props.onNodeContextmenu(params, menuList.value, popupShow.value)
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
        name: '删除',
        onClick: () => {
          console.log('edge删除', edge)
        },
      },
    ]
    if (Props.onEdgeContextmenu) {
      Props.onEdgeContextmenu(params, menuList.value, popupShow.value)
    }
    popupShow.value = true
  })

  return { popupShow, popupPosition, menuList }
}
