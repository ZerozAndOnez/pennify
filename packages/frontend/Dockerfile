# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the built Angular application to the Nginx HTML directory
COPY dist/packages/frontend /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 to the outside world
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]