# Frontend Dockerfile
FROM node:18 AS build
WORKDIR /app

# Fix: distutils installieren
RUN apt-get update && apt-get install -y python3 python3-pip python3-distutils && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
