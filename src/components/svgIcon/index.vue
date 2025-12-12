<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :style="{ color: color }" :width="size" :height="size">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
interface IProps {
  prefix?: string
  name: string
  color?: string
  size?: string
}
withDefaults(defineProps<IProps>(), {
  prefix: '#icon-',
  name: '',
  color: '',
  size: '16px',
})
</script>
<style scoped></style>
