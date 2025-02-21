# Use Node.js (Debian-based) instead of Alpine for compatibility
FROM node:18-bullseye

# make the 'app' folder the current working directory
WORKDIR /app/

COPY package*.json /app/

# install project dependencies
RUN npm install 

# Set non-interactive mode for apt-get
ENV DEBIAN_FRONTEND=noninteractive

# Install Java (Required for Firebase Emulators)
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*
 
ENV JAVA_HOME="$(readlink -f $(which java) | sed 's|/bin/java||')"
ENV PATH="$JAVA_HOME/bin:$PATH"

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# https://www.youtube.com/watch?v=CSb-sHNM2NY&ab_channel=U-LabsInternational
#https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Dockerfile-vs-docker-compose-Whats-the-difference#:~:text=The%20Dockerfile%20is%20used%20to,the%20docker%2Dcompose%20up%20command.
EXPOSE 8081
CMD ["npm", "run", "serve", "--", "--port", "8081"]