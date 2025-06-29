FROM node:20.15.1 AS development

WORKDIR /home/dev/frontend

LABEL maintainer="shreyas.19.dev@gmail.com" \
    version="1.0.0" \
    description="Docker image for Blog-App Frontend"

COPY ./blogapp/package*.json ./

RUN npm install

COPY ./blogapp .

CMD ["npm", "run", "dev"]