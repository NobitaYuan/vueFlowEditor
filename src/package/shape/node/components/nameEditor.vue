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

const inputOk = () => {
  isDoubleClick.value = null
  if (val.value === beforeName) return
  updateNodeData(Props.id, {
    name: val.value,
  })
  // @ts-ignore 自定义名称修改事件
  emits.nodesChange([{ type: 'renameNode', node: Props }])
}
const inputNo = () => {
  isDoubleClick.value = null
  if (val.value === beforeName) return
  val.value = beforeName
}
</script>

<template>
  <div class="nameEditor">
    <div class="name" v-show="!isDoubleClicked">
      {{ data.name || data.label }}
    </div>
    <div class="editName" v-if="isDoubleClicked">
      <input class="nameInput" rows="10" autofocus type="text" v-model="val" />
      <svg @click="inputOk" class="gou" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path id="stroke1" d="M19.5708 7.37842L10.3785 16.5708L5.42871 11.6211" stroke-linecap="square" stroke-width="1.5" stroke="currentColor" />
        </g>
      </svg>
      <svg @click="inputNo" class="cuo" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  </div>
</template>

<style lang="scss" scoped>
.nameEditor {
  display: inline-block;

  .name {
  }
  .editName {
    width: 100%;
    min-width: 100px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    gap: 2px;
    z-index: 99999;
    .nameInput {
      outline: none;
      width: 100%;
      height: fit-content;
      background-color: var(--td-bg-color-container);
    }
    .gou {
      width: 20px;
      height: 100%;
      flex-shrink: 0;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        box-shadow: 0 0 2px 2px var(--td-brand-color-2);
      }
    }
    .cuo {
      width: 20px;
      height: 100%;
      flex-shrink: 0;
      cursor: pointer;
      border-radius: 4px;
      &:hover {
        box-shadow: 0 0 2px 2px var(--td-error-color-2);
      }
    }
  }
}
</style>
