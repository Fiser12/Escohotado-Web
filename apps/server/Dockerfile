FROM node:22-alpine as base
RUN npm i -g pnpm turbo
WORKDIR /app

FROM base AS builder
COPY . .
RUN pnpm install
RUN pnpm build:server

FROM node:22-alpine AS runner

WORKDIR /app
ENV PAYLOAD_CONFIG_PATH=payload.config.js
COPY --from=builder /app/apps/server/.next/standalone ./
COPY apps/server/scripts/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

CMD HOSTNAME='0.0.0.0' node server.js
