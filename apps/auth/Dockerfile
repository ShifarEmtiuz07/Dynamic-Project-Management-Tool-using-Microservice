FROM node:20-alpine

WORKDIR /usr/src/app

COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/api-gateway ./apps/api-gateway
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001
CMD ["node", "dist/main"]