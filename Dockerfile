# syntax=docker/dockerfile:1.7-labs
#
# Enables --parents syntax for COPY - see: https://docs.docker.com/build/buildkit/dockerfile-release-notes/#170

ARG NODE_VERSION=20.11.1
ARG NGINX_VERSION=1.26.3

FROM node:${NODE_VERSION}-alpine AS installer

WORKDIR /app

COPY --parents packages/*/package.json .
COPY ./apps/mgo/package.json ./apps/mgo/
COPY ./package.json .
COPY ./pnpm-*.yaml .

RUN corepack enable
RUN pnpm install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app
COPY --from=installer /app /app
COPY . ./

WORKDIR /app/apps/mgo

RUN corepack enable
RUN pnpm run build

FROM nginx:${NGINX_VERSION}-alpine

ARG PORT
ARG LOAD_URL='https://lo-ad.test.mgo.irealisatie.nl'
ARG DVA_URL='https://dva.test.mgo.irealisatie.nl'

ENV LOAD_URL=$LOAD_URL
ENV DVA_URL=$DVA_URL
ENV NGINX_PORT=8080
ENV NGINX_ENVSUBST_OUTPUT_DIR="/etc/nginx"

COPY --from=builder /app/apps/mgo/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/nginx.conf.template

# Write envs to the config file that is read by the app
RUN echo -en "// This config was generated from the Dockerfile\n""\
window.config = {\n""\
  load_url: '$LOAD_URL',\n""\
  dva_url: '$DVA_URL'\n""\
};" >/usr/share/nginx/html/config.js

EXPOSE $NGINX_PORT

CMD ["nginx", "-g", "daemon off;"]
