FROM node 
WORKDIR app
RUN npm install -g nodemon 
COPY package.json package.json

COPY config /app/config
COPY src /app/src
COPY migrations /app/migrations
RUN npm install
# move node mudules from app folder to global location 
RUN mv /app/node_modules /node_modules 
# COPY . . 
RUN ls
#EXPOSE 80
EXPOSE 5001
CMD ["nodemon", "server.js"] 

