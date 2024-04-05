
FROM node:14.20-alpine
WORKDIR /app
COPY ./jarvis-frontend/package.json .
RUN npm install
COPY ./jarvis-frontend .

CMD ["npm", "start"]