# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the root package.json, lock file, and node_modules
COPY package.json package-lock.json ./ 
COPY node_modules ./node_modules

# Copy the backend source and build output
COPY packages/backend ./packages/backend
COPY dist/packages/backend ./dist/packages/backend

# Set the working directory to the backend build output
WORKDIR /usr/src/app/dist/packages/backend

# Expose the port used by the NestJS backend
EXPOSE 3000

# Command to run the backend service
CMD ["node", "main.js"]
