# Backend Dockerfile
FROM node:18
WORKDIR /app

# Fix: distutils installieren
RUN apt-get update && apt-get install -y python3 python3-pip python3-distutils && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
