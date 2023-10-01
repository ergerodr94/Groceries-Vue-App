FROM node:20-alpine

# make the 'app' folder the current working directory
WORKDIR /app/

COPY package*.json /app/

# install project dependencies
RUN npm install 

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# copy node_modules to the container
#COPY --from=0 /app/node_modules /app/node_modules

EXPOSE 8080
CMD ["npm", "run", "serve"]