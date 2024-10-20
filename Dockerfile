# Dockerfile for Angular Frontend

# Step 1: Use Node.js for building the Angular app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Use an official Nginx image to serve the Angular app
# (No need for Nginx as per your condition, so we'll use a basic HTTP server)
FROM httpd:2.4
COPY --from=build /app/dist/your-angular-app /usr/local/apache2/htdocs/

# Expose the port your frontend runs on (e.g., 80)
EXPOSE 4200
