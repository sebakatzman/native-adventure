FROM node:18-alpine AS build

ENV PORT 3000

WORKDIR /app
COPY package*.json ./

RUN apk update
RUN npm config set proxy http://proxy.com:port
RUN npm config set https-proxy http://proxy.com:port
RUN npm config set registry https://registry.npm.taobao.org
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]