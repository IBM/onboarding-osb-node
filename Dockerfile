# Use the official Node.js image as the base image
FROM node:24 AS builder

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY src src
RUN pnpm build

FROM node:24

WORKDIR /app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3001

ENTRYPOINT [ "node", "dist/app.js" ]
