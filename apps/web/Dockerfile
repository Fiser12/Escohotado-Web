FROM node:latest as base
RUN npm i -g pnpm turbo
WORKDIR /app

FROM base AS builder

COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

WORKDIR /app/apps/web

RUN pnpm install
WORKDIR /app/
RUN pnpm turbo run build --filter=web

FROM base AS runner

COPY --from=installer /app .

WORKDIR /app/apps/web

COPY apps/web/scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["sh", "-c", "node --env-file=/app/.env build"]
