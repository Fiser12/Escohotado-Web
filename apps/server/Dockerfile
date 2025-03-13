FROM node:22-alpine AS base
WORKDIR /app

FROM base AS builder
RUN apk add --no-cache libc6-compat

COPY . .
RUN corepack enable pnpm && pnpm i --frozen-lockfile;
RUN pnpm build:server

FROM node:22-alpine AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=payload.config.js


COPY --from=builder --chown=nextjs:nodejs /app/apps/server/.next/standalone ./apps/server
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --chown=nextjs:nodejs apps/server/scripts/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME='0.0.0.0' node /app/apps/server/server.js
