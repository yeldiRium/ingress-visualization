FROM node:12

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD . .

CMD [ "yarn", "run", "serve" ]
