import { type Node } from 'vue-flow-editor'

/** 可折叠的组合输出 */
export const groupLog = (msg: string, ...args: any[]) => {
  console.groupCollapsed(msg)
  console.log(...args)
  console.groupEnd()
}

/**
 *  检查是否存在两个节点的parentNode互为对方的id
 */
export function checkMutualParent(nodes: Node[]) {
  // 步骤1：创建id到节点的映射（方便快速查找）
  const nodeMap = new Map()
  nodes.forEach((node) => {
    nodeMap.set(node.id, node)
  })

  // 步骤2：遍历节点，检查是否存在互相为父节点的情况
  let hasMutualParent = false
  let mutualNodes: Node[] = []

  for (const node of nodes) {
    const parentId = node.parentNode
    // 排除parentNode为空或null的情况（无父节点）
    if (!parentId || parentId === null || parentId === '') continue
    // 查找父节点是否存在
    const parentNode = nodeMap.get(parentId)
    if (parentNode) {
      // 检查父节点的parentNode是否等于当前节点的id
      if (parentNode.parentNode === node.id) {
        hasMutualParent = true
        mutualNodes = [node, parentNode]
        break // 找到后退出循环
      }
    }
  }

  // 输出结果
  if (hasMutualParent) {
    console.log('存在两个节点的parentNode互为对方的id，节点信息：')
    console.log('节点1：', mutualNodes[0])
    console.log('节点2：', mutualNodes[1])
    // 移除两个节点的parentNode
    mutualNodes[0].parentNode = null
    mutualNodes[1].parentNode = null
    console.log('已移除两个节点的parentNode，请重新设置')
  }
  return nodes
}
