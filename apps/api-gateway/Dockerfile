FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files and install dependencies for the whole monorepo
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

# Build only the tasks app
RUN npm run build api-gateway

EXPOSE 3000

WORKDIR /usr/src/app/apps/api-gateway

CMD ["node", "dist/main"]