import { GraphNode, NodeChange, useVueFlow } from '@vue-flow/core'
import { getHelperLines } from '../utils'
// import helperLines from './components/helperLines.vue'
export const useHelpline = (vueFlowInstanceId: string) => {
  const { nodes, onNodesChange, applyNodeChanges } = useVueFlow(vueFlowInstanceId)

  const helperLineHorizontal = ref<number | undefined>(undefined)
  const helperLineVertical = ref<number | undefined>(undefined)

  function updateHelperLines(changes: NodeChange[], nodes: GraphNode[]) {
    helperLineHorizontal.value = undefined
    helperLineVertical.value = undefined
    if (changes.length === 1 && changes[0].type === 'position' && changes[0].dragging && changes[0].position) {
      const helperLines = getHelperLines(changes[0], nodes)
      // if we have a helper line, we snap the node to the helper line position
      // this is being done by manipulating the node position inside the change object
      changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x
      changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y
      // if helper lines are returned, we set them so that they can be displayed
      helperLineHorizontal.value = helperLines.horizontal
      helperLineVertical.value = helperLines.vertical
    }
    return changes
  }
  onNodesChange((changes) => {
    const updatedChanges = updateHelperLines(changes, nodes.value as GraphNode[])
    nodes.value = applyNodeChanges(updatedChanges)
  })

  return {
    helperLineHorizontal,
    helperLineVertical,
  }
}
