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

ARG baseUrl=LB-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81
ENV baseUrl=$baseUrl
RUN npm run build

# final image
FROM nginx:1.21.3-alpine
COPY --from=build /app/dist/front /usr/share/nginx/html
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
