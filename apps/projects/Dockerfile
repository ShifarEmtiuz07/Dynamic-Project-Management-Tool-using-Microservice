FROM node:20-alpine

WORKDIR /usr/src/app

# Copy root package files and install dependencies for the whole monorepo
COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/projects ./apps/projects
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types

RUN npm install

# Build only the tasks app
RUN npm run build projects
EXPOSE 5006

WORKDIR /usr/src/app/apps/projects

CMD ["node", "dist/main"]