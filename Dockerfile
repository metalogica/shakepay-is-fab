# this is a naive docker build. We must first run a production build then load that into the container as a set of static files
FROM node:14-buster-slim

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# cache core dependencies 
COPY package.json /app/package.json
RUN npm install
RUN npm install --save react 

CMD ["yarn", "frontend:start"]
