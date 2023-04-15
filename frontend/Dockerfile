# base image
FROM node:14.18.0-alpine3.14 as build

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./
RUN npm install

# add app
COPY . .

# build app
RUN npm run build --prod

# final image
FROM nginx:1.21.3-alpine
COPY --from=build /app/dist/front /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
