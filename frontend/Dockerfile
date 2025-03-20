# Use Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first, for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Install additional dependencies that might be missing
RUN npm install @types/react @types/react-dom @vitejs/plugin-react vite @mui/material @mui/icons-material @emotion/react @emotion/styled formik yup

# Set environment variables
ENV NODE_ENV=development
ENV VITE_API_URL=http://backend:5000

# Expose port
EXPOSE 5173

# Start the development server with proper host binding
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0 --port 5173"] 