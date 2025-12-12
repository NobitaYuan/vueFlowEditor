import { SidebarTreeType } from '@/package/index'
import { customShape } from '../shape'

export const useSidebar = () => {
  const sidebarData = ref<SidebarTreeType[]>([
    {
      id: '0',
      label: '开始事件',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-event)',
      data: {
        name: '节点0',
      },
      children: [
        {
          id: '0-1',
          label: '开始事件',
          type: 'node',
          shape: customShape.event_start,
          icon: customShape.event_start,
          iconColor: 'var(--color-event)',
          data: {
            name: '开始事件',
          },
          width: 50,
          height: 50,
        },
        // 信号开始事件
        {
          id: '0-2',
          label: '信号开始事件',
          type: 'node',
          shape: customShape.event_signal_start,
          icon: customShape.event_signal_start,
          iconColor: 'var(--color-event)',
          data: {
            name: '信号开始事件',
          },
          width: 50,
          height: 50,
        },
      ],
    },
    {
      id: '1',
      label: '任务',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-task)',
      data: {
        name: '任务',
      },
      children: [
        {
          id: '1-1',
          label: '用户任务',
          type: 'node',
          shape: customShape.task_user,
          icon: customShape.task_user,
          iconColor: 'var(--color-task)',
          data: {
            name: '用户任务',
          },
        },
        {
          id: '1-2',
          label: '决策任务',
          type: 'node',
          shape: customShape.task_decision,
          icon: customShape.task_decision,
          iconColor: 'var(--color-task)',
          data: {
            name: '决策任务',
          },
        },
        {
          id: '1-3',
          label: 'Http任务',
          type: 'node',
          shape: customShape.task_http,
          icon: customShape.task_http,
          iconColor: 'var(--color-task)',
          data: {
            name: 'Http任务',
          },
        },
        {
          id: '1-4',
          label: 'AIP任务',
          type: 'node',
          shape: customShape.task_aip,
          icon: customShape.task_aip,
          iconColor: 'var(--color-task)',
          data: {
            name: 'AIP任务',
          },
        },
        {
          id: '1-5',
          label: '脚本任务',
          type: 'node',
          shape: customShape.task_script,
          icon: customShape.task_script,
          iconColor: 'var(--color-task)',
          data: {
            name: '脚本任务',
          },
        },
        {
          id: '1-6',
          label: '手动任务',
          type: 'node',
          shape: customShape.task_manual,
          icon: customShape.task_manual,
          iconColor: 'var(--color-task)',
          data: {
            name: '手动任务',
          },
        },
      ],
    },
    {
      id: '2',
      label: '网关',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-gateway)',
      data: {
        name: '网关',
      },
      children: [
        {
          id: '2-1',
          label: '排他网关',
          type: 'node',
          shape: customShape.gateway_exclusive,
          icon: customShape.gateway_exclusive,
          iconColor: 'var(--color-gateway)',
          data: {
            name: '排他网关',
          },
          width: 50,
          height: 50,
        },
        {
          id: '2-2',
          label: '并行网关',
          type: 'node',
          shape: customShape.gateway_parallel,
          icon: customShape.gateway_parallel,
          iconColor: 'var(--color-gateway)',
          data: {
            name: '并行网关',
          },
          width: 50,
          height: 50,
        },
        {
          id: '2-3',
          label: '包容网关',
          type: 'node',
          shape: customShape.gateway_inclusive,
          icon: customShape.gateway_inclusive,
          iconColor: 'var(--color-gateway)',
          data: {
            name: '包容网关',
          },
          width: 50,
          height: 50,
        },

        {
          id: '2-4',
          label: '事件网关',
          type: 'node',
          shape: customShape.gateway_event,
          icon: customShape.gateway_event,
          iconColor: 'var(--color-gateway)',
          data: {
            name: '事件网关',
          },
          width: 50,
          height: 50,
        },
      ],
    },
    {
      id: '3',
      label: '中间事件',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-event2)',
      data: {
        name: '中间事件',
      },
      children: [
        {
          id: '3-1',
          label: '捕获事件',
          type: 'node',
          shape: customShape.event_catch,
          icon: customShape.event_catch,
          iconColor: 'var(--color-event2)',
          data: {
            name: '捕获事件',
          },
          width: 50,
          height: 50,
        },
        {
          id: '3-2',
          label: '抛出事件',
          type: 'node',
          shape: customShape.event_throw,
          icon: customShape.event_throw,
          iconColor: 'var(--color-event2)',
          data: {
            name: '抛出事件',
          },
          width: 50,
          height: 50,
        },
      ],
    },
    {
      id: '4',
      label: '子流程',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-task)',
      data: {
        name: '子流程',
      },
      children: [
        {
          id: '4-1',
          label: '内嵌子流程',
          type: 'node',
          shape: customShape.sub_process_embedded,
          icon: customShape.sub_process_embedded,
          iconColor: 'var( --color-task)',
          data: {
            name: '内嵌子流程',
          },
        },
      ],
    },
    {
      id: '5',
      label: '边界事件',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-boundary-event)',
      data: {
        name: '边界事件',
      },
      children: [
        {
          id: '5-1',
          label: '错误边界事件',
          type: 'node',
          shape: customShape.event_error_boundary,
          icon: customShape.event_error_boundary,
          iconColor: 'var(--color-boundary-event)',
          data: {
            name: '错误边界事件',
          },
          width: 50,
          height: 50,
        },
        {
          id: '5-2',
          label: '定时器边界事件',
          type: 'node',
          shape: customShape.event_timer_boundary,
          icon: customShape.event_timer_boundary,
          iconColor: 'var(--color-boundary-event)',
          data: {
            name: '定时器边界事件',
          },
          width: 50,
          height: 50,
        },
        {
          id: '5-3',
          label: '取消边界事件',
          type: 'node',
          shape: customShape.event_cancel_boundary,
          icon: customShape.event_cancel_boundary,
          iconColor: 'var(--color-boundary-event)',
          data: {
            name: '取消边界事件',
          },
          width: 50,
          height: 50,
        },
        {
          id: '5-4',
          label: '补偿边界事件',
          type: 'node',
          shape: customShape.event_compensation_boundary,
          icon: customShape.event_compensation_boundary,
          iconColor: 'var(--color-boundary-event)',
          data: {
            name: '补偿边界事件',
          },
          width: 50,
          height: 50,
        },
      ],
    },
    {
      id: '6',
      label: '结束事件',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-event2)',
      data: {
        name: '结束事件',
      },
      children: [
        {
          id: '6-1',
          label: '结束事件',
          type: 'node',
          shape: customShape.event_end,
          icon: customShape.event_end,
          iconColor: 'var(--color-event2)',
          data: {
            name: '结束事件',
          },
          width: 50,
          height: 50,
        },
        {
          id: '6-2',
          label: '错误结束事件',
          type: 'node',
          shape: customShape.event_error_end,
          icon: customShape.event_error_end,
          iconColor: 'var(--color-event2)',
          data: {
            name: '错误结束事件',
          },
          width: 50,
          height: 50,
        },
      ],
    },
    {
      id: '7',
      label: '泳道',
      type: 'node',
      icon: 'folder',
      iconColor: 'var(--color-lane)',
      data: {
        name: '泳道',
      },
      children: [
        {
          id: '7-1',
          label: '泳道',
          type: 'node',
          shape: customShape.lane,
          icon: customShape.lane,
          iconColor: 'var(--color-lane)',
          data: {
            name: '泳道',
          },
          width: 300,
          height: 500,
        },
        {
          id: '7-2',
          label: '泳道2',
          type: 'node',
          shape: customShape.lane2,
          icon: customShape.lane2,
          iconColor: 'var(--color-lane)',
          data: {
            name: '泳道',
          },
          width: 500,
          height: 300,
        },
      ],
    },
  ])

  return {
    sidebarData,
  }
}
