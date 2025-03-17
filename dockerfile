FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

ARG API_DATABASE_URL
ENV DATABASE_URL=$API_DATABASE_URL

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile && pnpm store prune

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN pnpm build

RUN npm uninstall -g pnpm

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono

EXPOSE 8080

CMD [ "node", "/app/dist/src/index.js" ]