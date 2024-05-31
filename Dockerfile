# Use the official Node.js image as the base image
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the .env.example file to .env
RUN cp .env.example .env

# Install nodemon globally for development
RUN yarn global add nodemon

# Ensure wait-for-it.sh is executable
# RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application in development mode
CMD ["yarn", "start:dev"]