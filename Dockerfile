FROM nginx:alpine

LABEL MAINTAINER="yanhao"

COPY static /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

VOLUME ["/etc/nginx", "/var/log/nginx"]