<h1 align="center">
  <a href="https://github.com/NobitaYuan/vueFlowEditor" target="_blank">vueFlowEditor</a>
</h1>

<p align="center">
  基于 VueFlow 构建的强大流程图编辑器，支持自定义节点、连线、拖拽创建、父子嵌套等丰富功能
</p>

## 📖 目录

- [项目简介](#项目简介)
- [使用方式](#使用方式)
- [核心特性](#核心特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心功能实现](#核心功能实现)
- [二次开发指南](#二次开发指南)
- [API 文档](#api-文档)

---

## 项目简介

**vueFlowEditor** 是一个基于 [VueFlow](https://vueflow.dev/) 开发的可视化流程图编辑器。它提供了完整的流程图编辑能力，包括节点拖拽、连线绘制、节点嵌套、右键菜单等功能，适用于工作流设计、业务流程建模、系统架构图等场景。

### 设计理念

- **组件化封装**：将编辑器功能封装为独立的组件，方便集成到任何 Vue 3 项目中
- **高度可定制**：支持自定义节点和连线类型，满足不同业务需求
- **预定义节点**：内置丰富的预定义节点类型（事件、任务、网关等图形节点）
- **完整的事件系统**：提供节点和连线的全生命周期事件监听

### 使用方式

#### 📦 方式一：作为完整项目使用（推荐用于学习和开发）

克隆整个仓库，直接运行和开发：

```shell
git clone https://github.com/NobitaYuan/vueFlowEditor.git
cd vueFlowEditor
pnpm install
pnpm dev
```

**[`src/views/vueFlow`](src/views/vueFlow) 文件夹里就是完整的引入使用的示例（包括了如何自定义节点）**

这种方式适合：

- ✅ 学习项目结构和实现原理
- ✅ 在现有基础上进行二次开发
- ✅ 需要修改核心功能的场景

#### 📦 方式二：作为独立 npm 包使用（推荐用于生产环境）

**重要说明**：项目的 [`src/package`](src/package/) 目录可以独立打包成一个 npm 包！

这意味着你可以：

- 将编辑器作为依赖包安装到你的项目中
- 在多个项目中复用编辑器功能
- 减小项目体积，只引入必要的功能

**打包步骤**：

```shell
# 1. 构建包
pnpm build

# 2. 构建完成后，dist 目录包含：
#    - dist/index.js         主入口文件
#    - dist/index.d.ts       TypeScript 类型声明
#    - dist/index.css        样式文件
#    - dist/chunks/          依赖分包
```

**在项目中使用**：

```vue
<template>
  <vueFlowEditor :sidebarData="sidebarData" :nodes="nodes" :edges="edges" :customNodes="customNodes" @add-node="handleAddNode" />
</template>

<script setup>
import { vueFlowEditor } from 'vue-flow-editor'
import 'vue-flow-editor/index.css'

// 你的业务逻辑
</script>
```

**本地测试（开发时）**：

```shell
# 在 vueFlowEditor 项目中构建后
cd /path/to/your-project
pnpm link ../vueFlowEditor
```

**发布到 npm（可选）**：

如果需要发布到 npm 供其他项目使用：

```shell
# 1. 修改 package.json 中的包名
# 2. 确保已登录 npm
npm login

# 3. 发布包
npm publish
```

这种方式适合：

- ✅ 在生产环境中集成编辑器功能
- ✅ 在多个项目中复用编辑器
- ✅ 希望减小项目体积，只引入必要的功能

---

## 核心特性

### ✨ 节点功能

- **拖拽创建**：从左侧面板拖拽节点到画布
- **节点嵌套**：支持父子节点层级关系，可拖拽节点到其他节点内部
- **节点操作**：移动、调整大小、删除、重命名
- **层级调整**：动态调整节点的 z-index 层级
- **丰富的预定义节点**：
  - 开始事件（开始事件、信号开始事件）
  - 任务节点（用户任务、决策任务、HTTP任务、API任务、脚本任务、手动任务）
  - 网关节点（排他网关、并行网关、包容网关、事件网关）
  - 中间事件（捕获事件、抛出事件）
  - 子流程（内嵌子流程）
  - 边界事件（错误边界事件、定时器边界事件、取消边界事件、补偿边界事件）
  - 结束事件（结束事件、错误结束事件）
  - 泳道（泳道、泳道2）

### 🔗 连线功能

- **手动连线**：拖拽节点连接点创建连线
- **重连功能**：支持连线的重新连接
- **连线编辑**：支持连线重命名、样式自定义
- **动画连线**：支持流动效果的动画连线
- **连线层级**：动态调整连线的 z-index

### 🛠 编辑器功能

- **画布操作**：缩放、平移、自适应
- **小地图**：可视化导航缩略图
- **工具栏**：快捷操作按钮
- **网格背景**：可配置的网格背景
- **右键菜单**：自定义上下文菜单
- **数据导入导出**：JSON 格式的数据导入导出

---

## 技术栈

### 核心框架

- **Vue 3.5+**：采用 Composition API 开发
- **TypeScript 5.8+**：完整的类型定义
- **Vite**：使用 rolldown-vite 作为构建工具，提升构建速度

### 核心依赖

- **@vue-flow/core**：流程图核心库
- **@vue-flow/background**：网格背景
- **@vue-flow/controls**：控制组件
- **@vue-flow/minimap**：小地图
- **@vue-flow/node-resizer**：节点调整大小
- **@vue-flow/node-toolbar**：节点工具栏

### UI 组件

- **TDesign Vue Next**：腾讯开源的企业级 UI 组件库
- **tdesign-icons-vue-next**：TDesign 图标库

### 状态管理

- **Pinia**：Vue 3 官方推荐的状态管理方案
- **pinia-plugin-persistedstate**：状态持久化

### 工具库

- **@vueuse/core**：Vue Composition API 工具集
- **vue-router**：路由管理
- **vue-i18n**：国际化支持
- **axios**：HTTP 请求
- **dayjs**：日期处理

### 开发工具

- **ESLint**：代码检查
- **Prettier**：代码格式化
- **Husky**：Git 钩子
- **lint-staged**：暂存文件检查
- **Commitizen + cz-git**：规范化提交

---

## 快速开始

### 安装依赖

```shell
# 克隆仓库
git clone https://github.com/NobitaYuan/vueFlowEditor.git

# 进入项目目录
cd vueFlowEditor

# 安装依赖
pnpm install
```

### 启动开发服务器

```shell
pnpm dev
```

### 构建生产版本

```shell
# 开发环境构建
pnpm build-dev

# 测试环境构建
pnpm build-test

# 生产环境构建
pnpm build-pro
```

### 📦 打包为 npm 包（独立使用）

如果你想将编辑器作为独立的 npm 包使用：

```shell
# 构建 npm 包
pnpm build

# 构建产物在 dist 目录：
# dist/
# ├── index.js           # ES Module 格式的入口文件
# ├── index.d.ts         # TypeScript 类型声明
# ├── index.css          # 样式文件
# └── chunks/            # 分包的依赖代码
```

**配置说明**：

- 打包入口：[`src/package/index.ts`](src/package/index.ts)
- 打包格式：ES Module
- 外部依赖：`vue`, `tdesign-vue-next`, `tdesign-icons-vue-next`, `vue-i18n`, `axios`（不会打包进bundle，需要使用者自行安装）

**发布到 npm**：

```shell
# 1. 修改 package.json 中的包名和版本号
# 2. 登录 npm
npm login

# 3. 发布
npm publish
```

### 代码检查

```shell
# 运行 ESLint 检查
pnpm lint

# 自动修复
pnpm lint:fix
```

---

## 项目结构

```
vueFlowEditor/
├── src/
│   ├── package/                    # 编辑器核心包
│   │   ├── components/             # 编辑器组件
│   │   │   ├── sidebar.vue        # 左侧侧边栏
│   │   │   └── contextmenu.vue    # 右键菜单
│   │   ├── shape/                  # 节点和连线形状
│   │   │   ├── node/              # 节点组件
│   │   │   │   ├── baseNode.vue   # 基础节点
│   │   │   │   ├── class.vue      # 类节点
│   │   │   │   └── components/    # 节点子组件
│   │   │   └── edge/              # 连线组件
│   │   │       ├── baseEdge.vue   # 基础连线
│   │   │       └── animationEdge.vue # 动画连线
│   │   ├── hooks/                  # 核心逻辑 Hooks
│   │   │   ├── useControl.ts      # 控制逻辑（事件监听）
│   │   │   ├── useDnD.ts          # 拖拽创建逻辑
│   │   │   ├── useDropToParent.ts # 父子嵌套逻辑
│   │   │   ├── useContextmenu.ts  # 右键菜单逻辑
│   │   │   └── useGlobal.ts       # 全局状态
│   │   ├── utils/                  # 工具函数
│   │   ├── type.ts                # 类型定义
│   │   ├── index.ts               # 导出入口
│   │   └── index.vue              # 编辑器主组件
│   ├── views/                     # 页面视图
│   │   └── vueFlow/               # 示例页面
│   │       ├── index.vue          # 编辑器使用示例
│   │       ├── shape/             # 自定义节点定义
│   │       ├── hooks/             # 页面级 Hooks
│   │       └── data/              # 示例数据
│   ├── layout/                    # 布局组件
│   ├── router/                    # 路由配置
│   ├── stores/                    # 状态管理
│   └── utils/                     # 全局工具
├── public/                        # 静态资源
└── package.json                   # 项目配置
```

---

## 二次开发指南

### 1. 创建自定义节点

> ⚠️ **重要**：所有自定义节点**必须**使用 [`baseNode.vue`](src/package/shape/node/baseNode.vue) 组件作为最外层包裹，这样才能获得以下基础功能：
>
> - ✅ 鼠标悬浮时自动显示连接点（Handle）
> - ✅ 选中或悬浮时显示节点尺寸调整器（NodeResizer）
> - ✅ 节点名称显示
> - ✅ 统一的节点样式和行为
>
> 如果不使用 `baseNode.vue` 包裹，你将需要手动实现这些功能。

#### 步骤一：创建节点组件

```vue
<!-- src/views/vueFlow/shape/node/myCustomNode.vue -->
<template>
  <!-- ⭐ 重要：使用 baseNode.vue 包裹自定义内容 -->
  <baseNode>
    <!-- 在 baseNode 的默认插槽中放置自定义内容 -->
    <div class="my-custom-node" :style="nodeStyle">
      <div class="node-icon">🎨</div>
      <div class="node-label">{{ data.name }}</div>
      <!-- 自定义业务内容 -->
      <div v-if="data.customField" class="custom-field">
        {{ data.customField }}
      </div>
    </div>
  </baseNode>
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
// ⭐ 引入 baseNode 基础组件
import baseNode from '@/package/shape/node/baseNode.vue'

interface NodeData {
  name: string
  // 自定义业务数据
  customField?: string
}

const props = defineProps<NodeProps<NodeData>>()

const nodeStyle = computed(() => ({
  ...props.style,
  // 自定义样式
  backgroundColor: '#f0f0f0',
  border: '2px solid #1890ff',
  borderRadius: '8px',
  padding: '12px',
}))
</script>

<style scoped>
.my-custom-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.node-icon {
  font-size: 32px;
}

.node-label {
  font-weight: bold;
  color: #333;
}

.custom-field {
  font-size: 12px;
  color: #666;
}
</style>
```

**baseNode 组件提供的功能**：

| 功能           | 说明                     | 触发条件                              |
| -------------- | ------------------------ | ------------------------------------- |
| **连接点显示** | 上下左右四个方向的连接点 | 选中或鼠标悬浮时显示                  |
| **尺寸调整**   | 节点宽高调整器           | 选中或鼠标悬浮时显示                  |
| **节点名称**   | 默认显示节点名称         | 通过 `data.name` 或 `data.label` 设置 |
| **插槽扩展**   | 支持自定义连接点和调整器 | 通过 `handle` 和 `nodeResizer` 插槽   |

**实际示例**：

查看项目中已有的节点实现，例如 [`task_user.vue`](src/views/vueFlow/shape/node/task_user.vue)：

```vue
<template>
  <!-- 使用 baseNodeTemplate（即 baseNode）包裹 -->
  <baseNodeTemplate v-bind="Props" :defaultLabel="false">
    <!-- 自定义节点内容 -->
    <div class="event_start">
      <svgIcon class="icon" :name="customShape.task_user" />
      <div class="label">{{ name }}</div>
    </div>
  </baseNodeTemplate>
</template>

<script setup lang="ts">
import { NodeProps } from '@/package/index'
import { nodeDataType, baseNodeTemplate } from '@/package/index'

interface IProps extends NodeProps {
  data: nodeDataType
}
const Props = withDefaults(defineProps<IProps>(), {})
</script>
```

这个例子展示了：

1. 使用 `baseNodeTemplate`（即 [`baseNode.vue`](src/package/shape/node/baseNode.vue)）作为最外层组件
2. 通过 `v-bind="Props"` 传递所有节点属性
3. 设置 `:defaultLabel="false"` 禁用默认的节点名称显示（因为我们在自定义内容中显示了）
4. 在默认插槽中放置自定义的节点样式和内容

#### 步骤二：注册自定义节点

```typescript
// src/views/vueFlow/shape/index.ts
import { CustomShapeType } from '@/package/index'
import myCustomNode from './node/myCustomNode.vue'

export enum customShape {
  myCustomNode = 'myCustomNode',
}

export const customNodes: CustomShapeType[] = [
  {
    name: customShape.myCustomNode,
    component: markRaw(myCustomNode),
  },
]
```

#### 步骤三：配置侧边栏数据

```typescript
// src/views/vueFlow/hooks/useSidebar.ts
export const useSidebar = () => {
  const sidebarData: SidebarTreeType[] = [
    {
      id: 'my-group',
      label: '我的节点组',
      type: 'node',
      children: [
        {
          id: 'my-custom-node',
          label: '自定义节点',
          type: 'node',
          shape: 'myCustomNode', // 对应 customShape.myCustomNode
          icon: 'custom-icon',
          iconColor: '#1890ff',
          data: { name: '自定义节点' },
          width: 200,
          height: 100,
        },
      ],
    },
  ]

  return { sidebarData }
}
```

### 2. 监听编辑器事件

```vue
<!-- 在使用 vueFlowEditor 的组件中 -->
<script setup lang="ts">
import { vueFlowEditor } from '@/package/index'

const handleAddNode = (node: GraphNode) => {
  console.log('新增节点:', node)
  // 业务逻辑处理
}

const handleMoveNode = (node: GraphNode) => {
  console.log('移动节点:', node)
  // 业务逻辑处理
}

const handleDropIn = (params: { node: GraphNode, parentNode: GraphNode }) => {
  console.log('节点进入父节点:', params)
  // 业务逻辑处理
}
</script>

<template>
  <vueFlowEditor
    @add-node="handleAddNode"
    @move-node="handleMoveNode"
    @drop-in="handleDropIn"
    <!-- 更多事件监听 -->
  />
</template>
```

### 3. 自定义右键菜单

```typescript
// 在 vueFlowEditor 组件中
const onNodeContextmenu = (event: NodeMouseEvent, menuList: contextmenuItem[], popupShow: boolean) => {
  // 返回 false 可以阻止默认菜单
  if (someCondition) {
    return false
  }

  // 可以修改 menuList 来自定义菜单项
  menuList.push({
    name: '自定义操作',
    disabled: false,
    onClick: () => {
      console.log('执行自定义操作')
    },
  })

  return true // 显示菜单
}
```

### 4. 自定义连线类型

```vue
<!-- src/views/vueFlow/shape/edge/myCustomEdge.vue -->
<template>
  <svg>
    <!-- 自定义连线样式 -->
    <path :d="path" :style="edgeStyle" fill="none" />
    <text v-if="data.name" :x="labelX" :y="labelY" class="edge-label">
      {{ data.name }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import { getBezierPath, BaseEdge } from '@vue-flow/core'
import type { EdgeProps } from '@vue-flow/core'

const props = defineProps<EdgeProps>()

const [path] = getBezierPath(props)
</script>
```

## API 文档

### vueFlowEditor Props

| 属性                | 类型                | 默认值      | 说明               |
| ------------------- | ------------------- | ----------- | ------------------ |
| `showSidebar`       | `boolean`           | `true`      | 是否显示左侧侧边栏 |
| `showMiniMap`       | `boolean`           | `true`      | 是否显示小地图     |
| `showToolbar`       | `boolean`           | `true`      | 是否显示工具栏     |
| `vueFlowInstanceId` | `string`            | `undefined` | VueFlow 实例 ID    |
| `sidebarData`       | `SidebarTreeType[]` | `[]`        | 侧边栏数据         |
| `nodes`             | `Node[]`            | `[]`        | 节点数据           |
| `edges`             | `Edge[]`            | `[]`        | 连线数据           |
| `customNodes`       | `CustomShapeType[]` | `[]`        | 自定义节点         |
| `customEdges`       | `CustomShapeType[]` | `[]`        | 自定义连线         |
| `flowProps`         | `FlowProps`         | `{}`        | VueFlow 配置项     |

### vueFlowEditor Events

#### 节点事件

| 事件名                | 参数                   | 说明                 |
| --------------------- | ---------------------- | -------------------- |
| `add-node`            | `GraphNode`            | 添加节点时触发       |
| `remove-node`         | `GraphNode`            | 删除节点时触发       |
| `move-node`           | `GraphNode`            | 移动节点时触发       |
| `resize-node`         | `GraphNode`            | 调整节点大小时触发   |
| `select-node`         | `GraphNode`            | 选中节点时触发       |
| `rename-node`         | `GraphNode`            | 重命名节点时触发     |
| `update-node-z-index` | `GraphNode`            | 更新节点层级时触发   |
| `drop-in`             | `{ node, parentNode }` | 节点进入父节点时触发 |
| `drop-out`            | `{ node, parentNode }` | 节点离开父节点时触发 |

#### 连线事件

| 事件名                | 参数                 | 说明               |
| --------------------- | -------------------- | ------------------ |
| `add-edge`            | `GraphEdge`          | 添加连线时触发     |
| `remove-edge`         | `GraphEdge`          | 删除连线时触发     |
| `select-edge`         | `GraphEdge`          | 选中连线时触发     |
| `reconnect-edge`      | `GraphEdge \| false` | 重连连线时触发     |
| `rename-edge`         | `GraphEdge`          | 重命名连线时触发   |
| `update-edge-z-index` | `GraphEdge`          | 更新连线层级时触发 |

### SidebarTreeType 接口

```typescript
interface SidebarTreeType {
  id: string // 唯一标识
  label: string // 显示名称
  icon?: string // 图标名称
  iconColor?: string // 图标颜色
  shape?: string // 节点形状类型
  type: 'node' | 'edge' // 类型：节点或连线
  data?: { name?: string } & Record<string, any> // 节点业务数据
  width?: number // 节点宽度
  height?: number // 节点高度
  style?: Styles // 节点样式
  children?: SidebarTreeType[] // 子节点
}
```

---

## 💬 一些话

没有最好的工具，只有最适合你的

这个项目是为了解决实际业务中的流程图编辑需求而诞生的。在设计过程中，我重点关注了以下几点：

1. **易用性**：开箱即用，降低集成成本
2. **可扩展性**：支持自定义节点和连线，满足不同业务场景
3. **稳定性**：完善的事件系统，确保数据流的可靠性
4. **性能**：基于 VueFlow 的优秀性能，支持大规模节点渲染

如果你在使用过程中遇到问题，欢迎提 Issue 或 PR。

---

# 📄 License

<a href="https://opensource.org/license/mit/" target="_blank">MIT license.</a>

> Copyright (c) 2026 NobitaYuan
