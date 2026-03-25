# syntax=docker/dockerfile:1.7-labs
#
# Enables --parents syntax for COPY - see: https://docs.docker.com/build/buildkit/dockerfile-release-notes/#170

ARG NODE_VERSION
ARG NGINX_VERSION

#
FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

#
FROM base AS installer

WORKDIR /app

COPY --parents packages/*/package.json .
COPY --parents apps/*/package.json .
COPY ./package.json .
COPY ./pnpm-*.yaml .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

#
FROM base AS builder

WORKDIR /app

COPY --from=installer /app /app
COPY . .

RUN pnpm exec nx run @minvws/mgo-mgo:build

#
FROM nginx:${NGINX_VERSION}-alpine-slim

ARG IGNORE_MISSING_TRANSLATIONS=true
ARG LOAD_URL='https://lo-ad.test.mgo.irealisatie.nl'
ARG DVA_URL='https://dvp-proxy.test.mgo.irealisatie.nl'
ARG PFT_URL='https://app-api.test.mgo.irealisatie.nl'
ARG ORGANIZATIONS_URL='https://lo-ad.test.mgo.irealisatie.nl/static/search/temp-organizations.json'
ARG DATA_SERVICE_ENDPOINTS_URL='https://lo-ad.test.mgo.irealisatie.nl/static/search/temp-endpoints.json'

ENV LOAD_URL=$LOAD_URL
ENV DVA_URL=$DVA_URL
ENV PFT_URL=$PFT_URL
ENV ORGANIZATIONS_URL=$ORGANIZATIONS_URL
ENV DATA_SERVICE_ENDPOINTS_URL=$DATA_SERVICE_ENDPOINTS_URL
ENV NGINX_PORT=8080
ENV NGINX_ENVSUBST_OUTPUT_DIR="/etc/nginx"

COPY --from=builder /app/apps/mgo/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/nginx.conf.template

# Write envs to the config file that is read by the app
RUN echo -en "// This config was generated from the Dockerfile\n""\
window.config = {\n""\
  ignore_missing_translations: '$IGNORE_MISSING_TRANSLATIONS',\n""\
  load_url: '$LOAD_URL',\n""\
  dva_url: '$DVA_URL',\n""\
  pft_url: '$PFT_URL',\n""\
  organizations_url: '$ORGANIZATIONS_URL',\n""\
  data_service_endpoints_url: '$DATA_SERVICE_ENDPOINTS_URL'\n""\
};" >/usr/share/nginx/html/config.js

EXPOSE $NGINX_PORT

CMD ["nginx", "-g", "daemon off;"]
