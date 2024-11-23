import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Cho phép lắng nghe trên tất cả địa chỉ IP (localhost, 127.0.0.1, mạng nội bộ)
    port: 5173,      // Port tùy chỉnh, đảm bảo giống port bạn đang sử dụng
  },
})
