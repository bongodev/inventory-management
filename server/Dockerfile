# base image
FROM node:22-slim

# set working directory
WORKDIR /code

# copy package.json and package-lock.json
COPY package*.json .

# install dependencies
RUN npm ci

# copy project files
COPY . .

EXPOSE 5000

# run the server
CMD ["npm", "run", "dev"]
