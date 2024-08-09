FROM node:18-alpine AS build

ENV PORT 3001

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
