FROM node:12

WORKDIR /app

COPY --chown=node:node package.json .
RUN npm install

COPY . .

RUN npm run build

COPY --chown=node:node . .
USER node

CMD ["npm", "start"]