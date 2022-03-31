import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import outputManifest from 'rollup-plugin-output-manifest'
// import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/static/app4/',

  plugins: [vue()],
  server: {
    port: 4004
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'src/main.ts'
      // plugins: [
      //   outputManifest({
      //     fileName: 'assets-manifest.json',
      //     outputPath: join(__dirname, 'dist'),
      //     generate: (kv, seed, opt) => {
      //       console.log('===>', seed, kv, opt)
      //       return chunks => {
      //         return chunks.reduce((prev, curr) => {
      //           if (curr.name) {
      //             prev[curr.name] = curr.fileName;
      //           }
      //           return prev;
      //         }, {})
      //       }
      //     }
      //   })
      // ]
    }
  }
})
