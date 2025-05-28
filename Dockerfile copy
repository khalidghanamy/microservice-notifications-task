# Use the official Node.js runtime as a parent image
FROM node:latest AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=build /usr/src/app/dist ./dist

# Change ownership to nestjs user
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose the port that the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["node", "dist/main.js"]
