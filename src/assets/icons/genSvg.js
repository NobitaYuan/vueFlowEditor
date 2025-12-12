/* eslint-disable no-underscore-dangle */
const customShape = {
  // 开始事件
  event_start: 'event_start',
  event_signal_start: 'event_signal_start',
  // 任务
  task_user: 'task_user',
  task_decision: 'task_decision',
  task_http: 'task_http',
  task_aip: 'task_aip',
  task_script: 'task_script',
  task_manual: 'task_manual',
  // 网关
  gateway_exclusive: 'gateway_exclusive',
  gateway_parallel: 'gateway_parallel',
  gateway_inclusive: 'gateway_inclusive',
  gateway_event: 'gateway_event',
  // 中间事件
  event_catch: 'event_catch',
  event_throw: 'event_throw',
  // 子流程
  sub_process_embedded: 'sub_process_embedded',
  // 边间事件
  event_error_boundary: 'event_error_boundary',
  event_timer_boundary: 'event_timer_boundary',
  event_cancel_boundary: 'event_cancel_boundary',
  event_compensation_boundary: 'event_compensation_boundary',
  // 结束事件
  event_end: 'event_end',
  event_error_end: 'event_error_end',
  // 泳道
  lane: 'lane',
  lane2: 'lane2',
}

import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// 根据以上的自定义形状，用nodeJS 生成对应的svg空文件
const genSvg = () => {
  //   遍历
  for (const key in customShape) {
    const value = customShape[key]
    const svg = ``
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const filePath = path.join(__dirname, `./${value}.svg`)
    fs.writeFileSync(filePath, svg)
    console.log(`生成 ${value}.svg 文件成功`)
  }
}
genSvg()
