FROM nginx:stable-alpine3.20
LABEL authors="vikazeni"
COPY /front/dist/pursit/browser /usr/share/nginx/html
COPY /iac/image/pursit-front/nginx.conf /etc/nginx/conf.d/default.conf
