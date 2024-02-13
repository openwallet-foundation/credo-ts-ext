FROM node:18 as base

# Credo specifc setup
WORKDIR /www

COPY bin ./bin
COPY package.json package.json
RUN yarn install --production

COPY build ./build

ENTRYPOINT [ "./bin/credo-rest.js", "start" ]
