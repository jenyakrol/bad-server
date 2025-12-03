FROM node:22-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN mkdir -p /app/public/temp /app/public/images
CMD ["npm", "run", "dev"]
