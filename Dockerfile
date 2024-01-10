FROM node:alpine3.19

WORKDIR /app

EXPOSE 8000

COPY . .

RUN npm install;

CMD ["npm", "run", "dev"]