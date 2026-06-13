FROM nginx:stable-alpine
# Copy app files into nginx html directory (avoid using mount-style :ro in COPY)
COPY . /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
