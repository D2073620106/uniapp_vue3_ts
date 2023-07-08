import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import AutoImportTypes from 'auto-import-types';
// import PiniaAutoRefs from 'pinia-auto-refs';
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImportTypes(),
    // PiniaAutoRefs(),
    AutoImport({
      dts: 'src/auto-imports.d.ts', // 此配置可以不用手动去导入公共函数如ref 等，可以在auto-imports.d.ts查看那些不需要手动导入
      imports: [
        'vue',
        'uni-app',
        // 'pinia',
        // {
        //   '@/helper/pinia-auto-refs': ['useStore']
        // }
      ],
      exclude: ['createApp'],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      extensions: ['vue'],
      dts: 'src/components.d.ts' //自动按需加载自定义组件
    }),
      uni()
  ],
  resolve: {
    alias: {
      "@/": resolve(__dirname, "src"),
    },
  },
});
