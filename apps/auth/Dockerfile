FROM node:20-alpine

WORKDIR /usr/src/app

COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig.base.json ./
COPY ../../libs ./libs
COPY ../../apps/auth ./apps/auth
COPY ../../eslint.config.mjs ./
COPY ../../proto ./proto
COPY ../../types ./types
RUN npm install

COPY . .

RUN npm run build auth

EXPOSE 5004
#WORKDIR /usr/src/app/apps/auth
CMD ["node", "dist/apps/auth/main"]