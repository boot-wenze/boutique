FROM node:alpine AS build

LABEL maintainer="DODI KABEYA <dodi.kabeya30@gmail.com>"

LABEL description="This is WENZE's boutique space interface."

WORKDIR /web-boutique

COPY package*.json ./

RUN npm install

COPY . .

CMD ["ng", "serve"]
# RUN npm run build --prod

# FROM nginx:alpine

# COPY --from=build /web-boutique/dist/boutique /usr/share/nginx/html

# EXPOSE 80

