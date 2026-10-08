#Etapa 1: build en Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#Etapa 2: servir con Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/caparana-front/browser /usr/share/nginx/html
EXPOSE 80