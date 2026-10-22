FROM node:22-alpine

WORKDIR /app

COPY package.json server.js index.html ./
COPY assets ./assets
COPY css ./css
COPY js ./js

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
