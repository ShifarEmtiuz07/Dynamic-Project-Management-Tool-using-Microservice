FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files and install dependencies for the whole monorepo
COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/userManagement ./apps/userManagement
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types

RUN npm install

# Build only the tasks app
RUN npm run build userManagement

WORKDIR /usr/src/app/apps/userManagement

CMD ["node", "dist/main"]