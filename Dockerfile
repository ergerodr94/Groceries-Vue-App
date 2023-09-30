FROM node:20-alpine

COPY package*.json /app/

# make the 'app' folder the current working directory
WORKDIR /app/

# install project dependencies
RUN npm install


EXPOSE 8080
CMD ["npm", "run", "serve"]