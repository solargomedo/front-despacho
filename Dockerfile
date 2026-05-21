FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_VENTAS=http://localhost:8083
ARG VITE_API_DESPACHOS=http://localhost:8081
ENV VITE_API_VENTAS=$VITE_API_VENTAS
ENV VITE_API_DESPACHOS=$VITE_API_DESPACHOS

RUN npm run build


FROM nginx:alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/cache/nginx \
    /var/run \
    /var/log/nginx && \
    chown -R appuser:appgroup \
    /var/cache/nginx \
    /var/run \
    /var/log/nginx \
    /usr/share/nginx/html \
    /tmp

USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
