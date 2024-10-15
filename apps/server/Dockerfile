FROM node:20-alpine as base
RUN npm i -g pnpm turbo
WORKDIR /app

FROM base AS runner
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

COPY . .
RUN pnpm install
RUN pnpm build:server
COPY apps/server/scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["sh", "-c", "pnpm start:server"]
