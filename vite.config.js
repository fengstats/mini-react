import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    // 全局配置
    jsxFactory: 'React.createElement',
  },
})
