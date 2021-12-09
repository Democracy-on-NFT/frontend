FROM node:16.10.0
WORKDIR /usr/src/frontend
COPY package.json ./
ADD . /usr/src/frontend
RUN rm -rf node_modules
RUN yarn
RUN yarn build
EXPOSE 3001
CMD ["yarn", "start"]
