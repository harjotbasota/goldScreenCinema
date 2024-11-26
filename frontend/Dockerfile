FROM node:23-alpine3.19 AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:alpine
WORKDIR /etc/nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx/certs /etc/nginx/certs
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]