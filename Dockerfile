FROM vcloud-nexus.vcloud.gov.il:8443/node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set proxy http://192.168.176.80:8080/
RUN npm config set https-proxy http://192.168.176.80:8080/
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false
RUN npm install 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "./src/server.js" ]
