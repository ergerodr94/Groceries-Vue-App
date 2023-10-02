FROM node:20-alpine

# make the 'app' folder the current working directory
WORKDIR /app/

COPY package*.json /app/

# install project dependencies
RUN npm install 

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# https://www.youtube.com/watch?v=CSb-sHNM2NY&ab_channel=U-LabsInternational
#https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Dockerfile-vs-docker-compose-Whats-the-difference#:~:text=The%20Dockerfile%20is%20used%20to,the%20docker%2Dcompose%20up%20command.
EXPOSE 8081
CMD ["npm", "run", "serve", "--", "--port", "8081"]