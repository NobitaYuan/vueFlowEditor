/** 可折叠的组合输出 */
export const groupLog = (msg: string, ...args: any[]) => {
  console.groupCollapsed(msg)
  console.log(...args)
  console.groupEnd()
}
