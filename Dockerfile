# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory within the container
WORKDIR /app

# Copy the package.json and package-lock.json files for truco-back
COPY ./truco-back/package*.json ./truco-back/
RUN cd ./truco-back && npm install

# Copy the package.json and package-lock.json files for truco-front
COPY ./truco-front/package*.json ./truco-front/
RUN cd ./truco-front && npm install

# Copy both truco-back and truco-front code into the container
COPY ./truco-back ./truco-back
COPY ./truco-front ./truco-front

# Build the truco-front
RUN cd ./truco-front && npm run build
# Copy the truco-front build into the truco-back public folder
RUN cp -r ./truco-front/dist/ ./truco-back/src/public/

RUN cd ./truco-back && npm run build

# Expose the port on which your Node.js server will run
EXPOSE 8080

# Start the Node.js server
CMD cd ./truco-back && npm run start;