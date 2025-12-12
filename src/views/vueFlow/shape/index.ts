import { CustomShapeType } from '@/package/index'
import event_start from './node/event_start.vue'
import event_signal_start from './node/event_signal_start.vue'
import task_user from './node/task_user.vue'
import task_decision from './node/task_decision.vue'
import task_http from './node/task_http.vue'
import task_aip from './node/task_aip.vue'
import task_script from './node/task_script.vue'
import task_manual from './node/task_manual.vue'
import gateway_exclusive from './node/gateway_exclusive.vue'
import gateway_parallel from './node/gateway_parallel.vue'
import gateway_inclusive from './node/gateway_inclusive.vue'
import gateway_event from './node/gateway_event.vue'
import event_catch from './node/event_catch.vue'
import event_throw from './node/event_throw.vue'
import sub_process_embedded from './node/sub_process_embedded.vue'
import event_error_boundary from './node/event_error_boundary.vue'
import event_timer_boundary from './node/event_timer_boundary.vue'
import event_cancel_boundary from './node/event_cancel_boundary.vue'
import event_compensation_boundary from './node/event_compensation_boundary.vue'
import event_end from './node/event_end.vue'
import event_error_end from './node/event_error_end.vue'
import lane from './node/lane.vue'
import lane2 from './node/lane2.vue'

/*
  开始事件
    开始事件
    信号开始事件
  任务
    用户任务
    决策任务
    http任务
    aip任务
    脚本任务
    手动任务
  网关
    排他网关
    并行网关
    包容网关
    事件网关
  中间事件
    捕获事件
    抛出事件
  子流程
    内嵌子流程
  边间事件
    错误边界事件
    定时器边界事件
    取消边界事件
    补偿边界事件
  结束事件
    结束事件
    错误结束事件
  泳道
    泳道
    泳道2
  */

export enum customShape {
  // 开始事件
  event_start = 'event_start',
  event_signal_start = 'event_signal_start',
  // 任务
  task_user = 'task_user',
  task_decision = 'task_decision',
  task_http = 'task_http',
  task_aip = 'task_aip',
  task_script = 'task_script',
  task_manual = 'task_manual',
  // 网关
  gateway_exclusive = 'gateway_exclusive',
  gateway_parallel = 'gateway_parallel',
  gateway_inclusive = 'gateway_inclusive',
  gateway_event = 'gateway_event',
  // 中间事件
  event_catch = 'event_catch',
  event_throw = 'event_throw',
  // 子流程
  sub_process_embedded = 'sub_process_embedded',
  // 边间事件
  event_error_boundary = 'event_error_boundary',
  event_timer_boundary = 'event_timer_boundary',
  event_cancel_boundary = 'event_cancel_boundary',
  event_compensation_boundary = 'event_compensation_boundary',
  // 结束事件
  event_end = 'event_end',
  event_error_end = 'event_error_end',
  // 泳道
  lane = 'lane',
  lane2 = 'lane2',
}

export const customNodes: CustomShapeType[] = [
  // 开始事件
  {
    name: customShape.event_start,
    component: event_start,
  },
  {
    name: customShape.event_signal_start,
    component: event_signal_start,
  },
  // 任务
  {
    name: customShape.task_user,
    component: task_user,
  },
  {
    name: customShape.task_decision,
    component: task_decision,
  },
  {
    name: customShape.task_http,
    component: task_http,
  },
  {
    name: customShape.task_aip,
    component: task_aip,
  },
  {
    name: customShape.task_script,
    component: task_script,
  },
  {
    name: customShape.task_manual,
    component: task_manual,
  },
  // 网关
  {
    name: customShape.gateway_exclusive,
    component: gateway_exclusive,
  },
  {
    name: customShape.gateway_parallel,
    component: gateway_parallel,
  },
  {
    name: customShape.gateway_inclusive,
    component: gateway_inclusive,
  },
  {
    name: customShape.gateway_event,
    component: gateway_event,
  },
  //  事件
  {
    name: customShape.event_catch,
    component: event_catch,
  },
  {
    name: customShape.event_throw,
    component: event_throw,
  },
  //  子流程
  {
    name: customShape.sub_process_embedded,
    component: sub_process_embedded,
  },
  // 边界事件
  {
    name: customShape.event_error_boundary,
    component: event_error_boundary,
  },
  {
    name: customShape.event_timer_boundary,
    component: event_timer_boundary,
  },
  {
    name: customShape.event_cancel_boundary,
    component: event_cancel_boundary,
  },
  {
    name: customShape.event_compensation_boundary,
    component: event_compensation_boundary,
  },
  // 结束事件
  {
    name: customShape.event_end,
    component: event_end,
  },
  {
    name: customShape.event_error_end,
    component: event_error_end,
  },
  // 泳道
  {
    name: customShape.lane,
    component: lane,
  },
  {
    name: customShape.lane2,
    component: lane2,
  },
].map((item) => ({
  ...item,
  component: markRaw(item.component),
}))
