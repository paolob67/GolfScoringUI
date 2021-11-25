# build the app
FROM node:latest AS builder
ENV "NODE_OPTIONS"="--openssl-legacy-provider"
WORKDIR /app
COPY ./ ./
RUN npm install -g @ionic/cli
RUN npm install
RUN npm run-script build

# setup http server on port 8080
FROM image-registry.openshift-image-registry.svc:5000/openshift/httpd:latest
COPY --from=builder /app/www/ /var/www/html/
EXPOSE 8080
CMD ["run-httpd"]
