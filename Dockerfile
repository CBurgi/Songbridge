FROM oven/bun:1 AS base
WORKDIR /app

COPY . .

RUN bun build.ts

USER bun
EXPOSE 8080/tcp
ENTRYPOINT [ "bun", "dist/index.js" ]
