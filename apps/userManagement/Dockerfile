FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files and install dependencies for the whole monorepo
# Install redis-cli
RUN apk add --no-cache redis
COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/userManagement ./apps/userManagement
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types

RUN npm install
COPY . .

# Build only the tasks app
RUN npm run build userManagement
EXPOSE 5002

#WORKDIR /usr/src/app/apps/userManagement

CMD ["node", "dist/apps/userManagement/main"]