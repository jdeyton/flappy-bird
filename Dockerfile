# Stage 1: Build the application
FROM node:20-slim AS builder
ENV NODE_ENV=development

WORKDIR /usr/src/app

# Copy package files and install all dependencies early in the layers
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY --chown=node:node . .

# Build the app
RUN npm run build

# Stage 2: Create the final production image
FROM node:20-slim
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

# Copy the built application and required source from the builder stage
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/index.js .
COPY --chown=node:node --from=builder /usr/src/app/public ./public
 
EXPOSE 3000
CMD [ "node", "index.js" ]
