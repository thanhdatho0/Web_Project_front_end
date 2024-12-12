# Sử dụng Node.js LTS làm môi trường build
FROM node:18 AS build-stage

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json để cài đặt dependencies
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng bằng Vite
RUN npm run build

# --- Stage chạy ứng dụng ---
FROM nginx:1.25 AS production-stage

# Sao chép file build từ build-stage sang thư mục Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx nếu cần (tùy chỉnh route)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Cấp quyền cho port 80
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
