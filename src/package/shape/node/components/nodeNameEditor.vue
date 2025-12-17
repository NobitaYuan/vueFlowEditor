<script lang="ts" setup>
import { useVueFlowGlobal } from '@/package/hooks'
import { useVueFlow } from '@vue-flow/core'

interface IProps {
  vueFlowInstanceId?: string
}
const Props = withDefaults(defineProps<IProps>(), {})

const { flowToScreenCoordinate } = useVueFlow(Props.vueFlowInstanceId)

const { isNodeDoubleClick } = useVueFlowGlobal()

const { updateNodeData, emits } = useVueFlow(Props.vueFlowInstanceId)

// 窗体的宽度
const dialogWidth = ref(200)
// 窗体的高度
const dialogHeight = ref(120)

// 是否显示
const isShow = computed(() => {
  return Boolean(isNodeDoubleClick.value)
})

// 当前的节点
const curNode = computed(() => {
  if (!isNodeDoubleClick.value?.node) return null
  return isNodeDoubleClick.value?.node
})

// 打开节点时的位置
const whenOpenPositon = ref({ x: 0, y: 0 })

// 当前的位置
const curPosition = computed(() => {
  if (!curNode.value)
    return {
      x: 99999,
      y: 99999,
    }

  // 节点计算后的位置
  const transFormedPosition = flowToScreenCoordinate(curNode.value.computedPosition)

  const gap = 4

  // 鼠标点击的位置
  const event = isNodeDoubleClick.value.event as MouseEvent
  const clientX = event.clientX
  const clientY = event.clientY

  // 当前节点移动的位置
  const movedPosition = {
    x: transFormedPosition.x - whenOpenPositon.value.x,
    y: transFormedPosition.y - whenOpenPositon.value.y,
  }

  // 结合打开时的位置和节点移动的位置 计算当前节点的位置
  let x = clientX + movedPosition.x - gap
  let y = clientY + movedPosition.y - gap

  // 获取当前视口的尺寸
  const { clientWidth, clientHeight } = document.documentElement
  // 如果当前节点的位置加上当前节点的宽度加上gap大于视口的宽度，那么就将当前节点的位置设置为视口宽度减去节点宽度
  if (x + dialogWidth.value > clientWidth) {
    x = clientWidth - dialogWidth.value - gap
  }
  // 如果当前节点的位置加上当前节点的高度加上gap大于视口的高度，那么就将当前节点的位置设置为视口高度减去节点高度
  if (y + dialogHeight.value > clientHeight) {
    y = clientHeight - dialogHeight.value - gap
  }
  // 如果当前节点的位置小于0，那么就将当前节点的位置设置为0
  if (x < 0) {
    x = gap
  }
  // 如果当前节点的位置小于0，那么就将当前节点的位置设置为0
  if (y < 0) {
    y = gap
  }

  return { x, y }
})

// 初始的名称
let beforeName = ''

// 输入框名称
const inputVal = ref(beforeName)

const inputOk = async () => {
  if (inputVal.value === beforeName) return
  updateNodeData(curNode.value.id, {
    name: inputVal.value,
  })
  await nextTick()
  // @ts-ignore 自定义名称修改事件
  emits.nodesChange([{ type: 'renameNode', node: curNode.value }])
  isNodeDoubleClick.value = null
}
const inputNo = () => {
  isNodeDoubleClick.value = null
  if (inputVal.value === beforeName) return
  inputVal.value = beforeName
}

const inputRef = ref<HTMLElement>()
watch(isNodeDoubleClick, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
    beforeName = val.node.data?.name || val.node.data?.label || ''
    inputVal.value = beforeName
    whenOpenPositon.value = flowToScreenCoordinate({
      x: val.node.computedPosition.x,
      y: val.node.computedPosition.y,
    })
  }
})
</script>

<template>
  <transition :mode="'out-in'" enter-active-class="animate__animated animate__fadeIn">
    <div
      class="nameEditor"
      :style="{
        width: dialogWidth + 'px',
        height: dialogHeight + 'px',
        left: curPosition.x + 'px',
        top: curPosition.y + 'px',
      }"
      v-show="isShow"
    >
      <div class="editName">
        <textarea ref="inputRef" class="nameInput" autofocus type="text" v-model="inputVal" />
        <div class="btns">
          <div @click="inputNo" class="cuo" title="取消">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  id="stroke1"
                  d="M16.9503 7.05029L12.0005 12M12.0005 12L7.05078 16.9498M12.0005 12L16.9503 16.9498M12.0005 12L7.05078 7.05029"
                  stroke-linecap="square"
                  stroke-width="1.5"
                  stroke="currentColor"
                />
              </g>
            </svg>
          </div>
          <div @click="inputOk" class="gou" title="保存">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path id="stroke1" d="M19.5708 7.37842L10.3785 16.5708L5.42871 11.6211" stroke-linecap="square" stroke-width="1.5" stroke="currentColor" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
// 动画速度
.animate__animated {
  --animate-duration: 0.15s;
}
.nameEditor {
  position: absolute;

  .editName {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid var(--td-text-color-primary);
    background-color: var(--td-bg-color-container);
    gap: 2px;
    box-shadow: 4px 0 10px 2px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;

    .nameInput {
      border-bottom: 1px solid var(--td-text-color-primary);
      background-color: var(--td-bg-color-container);
      outline: none;
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 8px 4px;
      color: var(--td-text-color-primary);
      flex: 1;
    }
    .btns {
      width: 100%;
      display: flex;
      gap: 2px;
      justify-content: space-between;
      padding: 4px 8px;
      .gou {
        width: 24px;
        flex-shrink: 0;
        cursor: pointer;
        border-radius: 4px;
        color: var(--td-text-color-primary);
        text-align: center;
        &:hover {
          box-shadow: 0 0 2px 2px var(--td-brand-color-2);
        }
      }
      .cuo {
        width: 24px;
        flex-shrink: 0;
        cursor: pointer;
        border-radius: 4px;
        color: var(--td-text-color-primary);
        text-align: center;
        &:hover {
          box-shadow: 0 0 2px 2px var(--td-error-color-2);
        }
      }
    }
  }
}
</style>
