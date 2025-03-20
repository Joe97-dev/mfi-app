# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 5173

# Start the development server with host flag
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 