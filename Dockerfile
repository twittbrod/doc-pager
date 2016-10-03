FROM node:6.6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
#COPY node_modules /usr/src/app/node_modules
#use run npm install to install npm dependencies from previously copied package.json
RUN npm install


# Bundle app source
COPY . /usr/src/app

# Bundle app source
COPY ./admin /usr/src/app/admin
COPY ./api /usr/src/app/api
COPY ./canned-messages /usr/src/app/canned-messages
COPY ./messages /usr/src/app/messages
COPY ./models /usr/src/app/models
COPY ./people /usr/src/app/people
COPY ./public /usr/src/app/public
COPY ./public/app /usr/src/app/public/app
COPY ./public/app/components /usr/src/app/public/app/components
COPY ./public/app/components/doctor-list /usr/src/app/public/app/components/doctor-list
COPY ./public/app/components/message-list /usr/src/app/public/app/components/message-list
COPY ./public/app/components/room-list /usr/src/app/public/app/components/room-list
COPY ./public/dist /usr/src/app/public/dist
COPY ./rooms /usr/src/app/rooms
COPY ./setup-admin /usr/src/app/setup-admin
COPY ./spark-auth /usr/src/app/spark-auth
COPY ./spec /usr/src/app/spec
COPY ./spec/support /usr/src/app/spec/support
COPY ./teams /usr/src/app/teams
COPY ./vendors /usr/src/app/vendors
COPY ./views /usr/src/app/views
COPY ./views/layouts /usr/src/app/views/layouts
COPY ./views/messages /usr/src/app/views/messages
#COPY ./static /usr/src/app/static
#COPY ./config /usr/src/app/config
#COPY ./app.js /usr/src/app/
#COPY ./server.js /usr/src/app/

EXPOSE 8080

#CMD [ "node", "start" ]
CMD [ "node", "main.js" ]
