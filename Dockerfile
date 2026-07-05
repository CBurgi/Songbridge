FROM oven/bun:1 AS base
WORKDIR /app

COPY . .

RUN bun build.ts

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "dist/index.js" ]
