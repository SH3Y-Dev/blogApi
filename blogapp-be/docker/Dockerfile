FROM alpine:3.20.0 AS base

RUN apk add --update nodejs="20.15.1-r0" npm="10.8.0-r0"

WORKDIR /home/dev/backend

FROM base AS development

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

LABEL maintainer="shreyas.19.dev@gmail.com" \
      version="1.0.0" \
      description="Docker image for Blog-App Backend (Express.js)"

COPY ./blogapp-be/package*.json ./

RUN npm install

COPY ./blogapp-be/ ./

# Expose your app port
EXPOSE 3001

CMD ["npx", "nodemon", "server.js"]

FROM base AS production

ARG IMAGE_VERSION
ENV NODE_ENV=production
ENV IMAGE_VERSION=$IMAGE_VERSION

RUN addgroup -g 1005 -S dev \
  && adduser -u 1005 -h /home/dev -s /bin/sh -G dev -S dev

WORKDIR /home/dev/backend

COPY --from=development /home/dev/backend /home/dev/backend

USER dev

EXPOSE 3001

CMD ["node", "server.js"]
