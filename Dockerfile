# 1. Use an official, lightweight Node.js LTS image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first to leverage Docker layer caching
COPY package*.json ./

# 4. Install only production dependencies cleanly
RUN npm ci --omit=dev && npm cache clean --force

# 5. Copy the rest of your application source code
COPY . .

# 6. Run the app as a non-root user for security
USER node

# 7. Expose the port your app listens on
EXPOSE 3000

# 8. Start the application directly using node (replace index.js with your entry file)
CMD ["node", "index.js"]

