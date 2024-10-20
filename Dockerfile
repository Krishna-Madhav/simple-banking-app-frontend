# Use the official Node.js image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --configuration=production

# Stage 2: Serve the application with a simple HTTP server
FROM nginx:alpine

# Copy the Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/banking-app/browser /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Command to run Nginx
#CMD ["nginx", "-g", "daemon off;"]
