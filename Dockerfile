FROM node:20 AS build
# Use Codespaces URL or localhost:3001
ARG VITE_BACKEND_URL=https://supreme-space-rotary-phone-jjjqg6p64j45fqgxg-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# Start the SSR server
CMD ["npm", "start"]