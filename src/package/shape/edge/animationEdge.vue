<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useVueFlow, type EdgeProps } from '@vue-flow/core'
import { nodeDataType } from '../../type'

interface IProps extends EdgeProps {
  data: nodeDataType
  vueFlowInstanceId?: string
}
const Props = withDefaults(defineProps<IProps>(), {})

const path = computed(() => getSmoothStepPath(Props))

const curName = computed(() => Props.data?.name || Props.data?.label || Props?.label || '')

const { updateEdgeData } = useVueFlow(Props.vueFlowInstanceId)

const edgeRef = ref()
const labelRef = ref<SVGPathElement>()

const isAnimating = computed({
  get: () => Props.data.isAnimating || false,
  set: (value) => {
    updateEdgeData(Props.id, { isAnimating: value })
  },
})

async function runAnimation() {
  const pathEl = edgeRef.value?.pathEl
  const labelEl = labelRef.value

  if (!pathEl || !labelEl) {
    console.warn('Path or label element not found')
    return
  }

  const totalLength = pathEl.getTotalLength()

  isAnimating.value = true

  // We need to wait for the next tick to ensure that the label element is rendered
  await nextTick()
  const keyframes = [{ offsetDistance: '0%' }, { offsetDistance: '100%' }]

  // use path length as a possible measure for the animation duration
  const pathLengthDuration = totalLength * 10

  /**
   * We animate the label element along the path of the edge using the `offsetDistance` property and
   * the Web Animations API.
   *
   * The `animate` method returns an `Animation` object that we can use to listen to events like `finish` or `cancel`.
   *
   * The animation duration is calculated based on the total length of the path and clamped between 1.5s and 3s.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
   */
  const labelAnimation = labelEl.animate(keyframes, {
    duration: Math.min(Math.max(pathLengthDuration, 1500), 3000), // clamp duration between 1.5s and 3s
    direction: 'normal',
    easing: 'linear',
    iterations: 999,
  })

  const handleAnimationEnd = () => {
    isAnimating.value = false
  }

  labelAnimation.onfinish = handleAnimationEnd
  labelAnimation.oncancel = handleAnimationEnd
}

onMounted(() => {
  runAnimation()
})
</script>

<template>
  <!-- You can use the `BaseEdge` component to create your own custom edge more easily -->
  <BaseEdge ref="edgeRef" :path="path[0]" v-bind="Props" />
  <!-- Use the `EdgeLabelRenderer` to escape the SVG world of edges and render your own custom label in a `<div>` ctx -->
  <EdgeLabelRenderer>
    <div
      class="baseEdgeLabel"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
    >
      {{ curName }}
    </div>
    <div
      class="dot"
      ref="labelRef"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        offsetPath: `path('${path[0]}')`,
        offsetRotate: '0deg',
        offsetAnchor: 'center',
      }"
    ></div>
  </EdgeLabelRenderer>
</template>

<style lang="scss" scoped>
.baseEdgeLabel {
  color: var(--td-text-color-primary);
  font-size: 12px;
  background-color: var(--td-bg-color-container);
  padding: 2px;
  border-radius: 2px;
}
.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #0052d9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
