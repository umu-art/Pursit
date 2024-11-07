FROM nginx:stable-alpine3.20
LABEL authors="vikazeni"
COPY /dist/pursit/browser /usr/share/nginx/html
COPY /iac/image/nginx.conf /etc/nginx/conf.d/default.conf
