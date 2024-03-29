# Build stage

FROM node:13-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage

FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx-debug", "-g", "daemon off;"]