FROM node:alpine3.19

WORKDIR /app

EXPOSE 8000

RUN npm install -g pnpm;

COPY . .

RUN pnpm install;

CMD ["pnpm", "run", "dev"]