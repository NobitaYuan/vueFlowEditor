<script lang="ts" setup>
import { useVueFlowGlobal } from '@/package/hooks'
import { NodeProps, useVueFlow } from '@vue-flow/core'

interface IProps extends NodeProps {
  vueFlowInstanceId?: string
}
const Props = withDefaults(defineProps<IProps>(), {})

const { isDoubleClick } = useVueFlowGlobal()

const { updateNodeData, emits } = useVueFlow(Props.vueFlowInstanceId)

// 是否被双击
const isDoubleClicked = computed(() => {
  if (!isDoubleClick.value) return false
  return Props.id === isDoubleClick.value.node.id
})

const beforeName = Props.data?.name || Props.data?.label || ''

const val = ref(beforeName)

const inputOk = async () => {
  isDoubleClick.value = null
  if (val.value === beforeName) return
  updateNodeData(Props.id, {
    name: val.value,
  })
  await nextTick()
  // @ts-ignore 自定义名称修改事件
  emits.nodesChange([{ type: 'renameNode', node: Props }])
}
const inputNo = () => {
  isDoubleClick.value = null
  if (val.value === beforeName) return
  val.value = beforeName
}

const inputRef = ref<HTMLElement>()
watch(isDoubleClicked, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div class="nameEditor">
    <div class="name" v-show="!isDoubleClicked">
      <slot>
        {{ data.name || data.label }}
      </slot>
    </div>
    <div class="editName" v-if="isDoubleClicked">
      <textarea ref="inputRef" class="nameInput" autofocus type="text" v-model="val" />
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
</template>

<style lang="scss" scoped>
.nameEditor {
  display: inline-block;
  width: 100%;
  .name {
  }
  .editName {
    position: absolute;
    --gap: 8px;
    left: var(--gap);
    top: var(--gap);
    width: calc(100% - var(--gap) * 2);
    height: calc(100% - var(--gap) * 2);
    min-width: 100px;
    min-height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid var(--td-text-color-primary);
    background-color: var(--td-bg-color-container);
    gap: 2px;
    z-index: 99999;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    .nameInput {
      border-bottom: 1px solid var(--td-text-color-primary);
      background-color: var(--td-bg-color-container);
      outline: none;
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 4px;
    }
    .btns {
      width: 100%;
      display: flex;
      gap: 2px;
      justify-content: space-between;
      padding: 0px 4px;
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
