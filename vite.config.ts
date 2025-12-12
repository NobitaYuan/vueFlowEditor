import path from 'path'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig((env: ConfigEnv) => {
  const { mode } = env
  // 环境变量
  const envVar = loadEnv(mode, process.cwd())

  // 环境变量
  const { VITE_APP_TITLE, VITE_APP_BASE_API_URL } = envVar
  const IP = {
    test: 'http://120.53.11.108:8999',
  }
  return {
    plugins: [
      vueDevTools(),
      vueJsx(),
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            documentTitle: VITE_APP_TITLE,
          },
        },
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/types/auto-imports.d.ts',
        // 生成声明global的.eslintrc-auto-import.json，随后导入eslint防止报错
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
        dts: 'src/types/components.d.ts',
      }),
      visualizer({
        filename: 'boundleView.html', //分析图生成的文件名
        open: false, //如果存在本地服务端口，将在打包后自动展示
      }),
      dts({
        outDir: 'dist',
        tsconfigPath: './tsconfig.app.json',
        exclude: ['node_modules/**'],
        include: ['./src/package/**/*.ts', './src/package/**/*.vue'],
        // insertTypesEntry: true,
        // rollupTypes: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 图标文件夹
        symbolId: 'icon-[name]',
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: 'fill', // 移除所有的 fill 属性
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      host: true,
      proxy: {
        [VITE_APP_BASE_API_URL]: {
          target: IP.test,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log(`[Proxy Url] ${req.method} ${req.url} -> ${options.target}${req.url}`)
            })
          },
        },
      },
    },
    build: {
      sourcemap: true,
      //打包后文件目录
      outDir: 'dist',
      //压缩
      minify: false,
      rollupOptions: {
        //忽略打包vue文件
        // external: ['vue', '@vue-flow/core', 'tdesign-vue-next', 'tdesign-icons-vue-next'],
        external: ['vue', 'tdesign-vue-next', 'tdesign-icons-vue-next'],
        //input: ["index.ts"],
        output: {
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name].js',
          assetFileNames: '[name][extname]',
        },
      },
      lib: {
        entry: './src/package/index.ts',
        name: 'vueFlowEditor',
        fileName: 'index',
        formats: ['es'],
      },
    },
  }
})
