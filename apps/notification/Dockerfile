FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files and install dependencies for the whole monorepo
COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/notification ./apps/notification
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types

RUN npm install

# Build only the notification app
RUN npm run build notification
EXPOSE 5004

WORKDIR /usr/src/app/apps/notification

CMD ["node", "dist/main"]