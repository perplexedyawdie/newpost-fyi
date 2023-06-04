# Use the official Node.js lts image as the base image
FROM node:lts-slim

# Set the working directory inside the container
WORKDIR /app

RUN apt-get update -y

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Set the command to run your Next.js app using npm
CMD ["npm", "start"]