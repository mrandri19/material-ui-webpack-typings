FROM alpine
MAINTAINER Andrea Cognolato <andrecogno@hotmail.it>

RUN apk add --update nodejs && \
    mkdir /app
RUN npm i -g http-server
ADD /build /app

EXPOSE 3000

CMD hs -p 3000 app
