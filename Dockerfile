FROM node:20.15.0

# Install Nano
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "nano"]

# App Directory
WORKDIR /var/www/benwhybrow.com

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose to Port
EXPOSE 3023

# Start the app
CMD [ "node", "app.js" ]