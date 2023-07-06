# Use the official Node.js image as the base
FROM node:18.13.0

# Set the working directory inside the container
WORKDIR /orchestrator

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js application listens on (optional)
EXPOSE 4000

# Define the command to run your application
CMD [ "node", "index.js" ]