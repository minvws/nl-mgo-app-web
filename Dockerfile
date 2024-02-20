FROM node:20.11.0-alpine3.18

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


COPY . /app
WORKDIR /app
RUN pnpm install;


EXPOSE 8000
CMD ["pnpm", "run", "dev"]
