FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start with host flag to allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]