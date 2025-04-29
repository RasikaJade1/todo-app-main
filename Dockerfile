# Use a supported Node.js LTS version (Node.js 20 is LTS as of April 2025)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]