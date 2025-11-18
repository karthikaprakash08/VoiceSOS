# Build stage
FROM node:lts-alpine as builder
WORKDIR /app

# Copy only package.json first for faster caching
COPY package*.json ./

RUN npm install

# Copy everything else
COPY . .

# Run Vite build (outputs to /app/dist)
RUN npm run build

# Serve stage
FROM nginx:stable-alpine

# Copy the Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
