FROM dockerhub.timeweb.cloud/nginx:stable-alpine3.20
LABEL authors="vikazeni"
COPY /cdn /usr/share/nginx/html/cdn
COPY /iac/image/pursit-cdn/nginx.conf /etc/nginx/conf.d/default.conf
