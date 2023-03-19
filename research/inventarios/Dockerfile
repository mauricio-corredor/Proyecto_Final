FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install -g npm@8.19.2
RUN npm install --quiet

COPY . .

CMD ["npm", "run", "start"]
