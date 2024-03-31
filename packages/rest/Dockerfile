# Node 20.12 has some issues with node-gyp when running yarn install
FROM node:20.11 as all-dependencies

WORKDIR /all-dependencies

# Copy files required for yarn install
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY packages/rest/package.json packages/rest/package.json

# Install dependencies
RUN yarn install

# The build stage installs all node_modules (also dev)
# and build the JS files to run the REST server
FROM all-dependencies as build

# Copy remaining files for rest package and build the JS files
COPY tsconfig.build.json tsconfig.build.json
COPY tsconfig.json tsconfig.json
COPY packages/rest packages/rest
WORKDIR /all-dependencies/packages/rest
RUN yarn build

# The production-dependencies stage installs only the production node_modules
# It is based on the all-dependencies so it can use the yarn-cache and doesn't
# have to re-fetch all deps (as prod deps are a subset of all deps)
FROM all-dependencies as production-dependencies

WORKDIR /production-dependencies

COPY packages/rest/package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

FROM node:20.11 as final

WORKDIR /app

# Copy build files
COPY --from=build /all-dependencies/packages/rest/build build

# Copy dependencies
COPY --from=production-dependencies /production-dependencies/node_modules node_modules

# Copy source files
COPY packages/rest/bin bin
COPY packages/rest/package.json package.json

ENTRYPOINT [ "./bin/credo-rest.js", "start" ]
