<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { contextmenuItem } from '../type'

interface IProps {
  modelValue: boolean
  menuList: contextmenuItem[]
  position: { x: number; y: number }
}
const Props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  menuList: () => [],
  position: () => ({ x: 0, y: 0 }),
})
const emit = defineEmits(['update:modelValue'])

const target = useTemplateRef<HTMLElement>('contextmenu')

// 点击外部就关闭弹窗
onClickOutside(target, () => {
  if (!Props.modelValue) return
  closeFn()
})

const closeFn = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <transition :mode="'out-in'" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
    <div
      class="contextmenu_container"
      v-show="Props.modelValue"
      :style="{
        left: `${Props.position.x}px`,
        top: `${Props.position.y}px`,
      }"
      ref="contextmenu"
    >
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in Props.menuList"
          :key="index"
          :class="{ disabled: item.disabled }"
          @click="
            async () => {
              await item.onClick()
              closeFn()
            }
          "
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.contextmenu_container {
  position: fixed;
  background: var(--td-bg-color-container);
  box-shadow: var(--td-shadow-2), var(--td-shadow-inset-top), var(--td-shadow-inset-right), var(--td-shadow-inset-bottom), var(--td-shadow-inset-left);
  border-radius: var(--td-radius-medium);
  padding: 6px;
  color: var(--td-text-color-primary);
  z-index: 999;
  width: 100px;
  overflow: hidden;
  white-space: wrap;
  transition: all 0.15s ease-in-out;
  .list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    .item {
      color: var(--td-text-color-primary);
      border-radius: var(--td-radius-default);
      transition: background-color 0.2s cubic-bezier(0.82, 0, 1, 0.9);
      padding: 3px 8px;
      cursor: pointer;
      font-size: 14px;
      line-height: 22px;
      user-select: none;
      &:hover {
        background: var(--td-bg-color-container-hover);
      }
      &.disabled {
        color: var(--td-text-color-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
}
// 动画速度
.animate__animated {
  --animate-duration: 0.15s;
}
</style>
