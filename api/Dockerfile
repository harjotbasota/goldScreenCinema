FROM node:23-alpine3.19
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm","start"]