import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // Cho phep Vite su dung duoc process.env, mac dinh thi khong ma se phai dung import.meta.env
  // https://github.com/vitejs/vite/issues/1973
  define: {
    'process.env': process.env
  },

  plugins: [
    react(),
    svgr()
  ],
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
