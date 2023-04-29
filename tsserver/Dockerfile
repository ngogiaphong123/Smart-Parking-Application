FROM node:20-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD [ "npm", "run", "dev" ]