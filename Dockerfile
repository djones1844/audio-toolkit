FROM jrottenberg/ffmpeg:3.4-alpine

MAINTAINER Daniel Jones <djones1844@gmail.com>

RUN apk add --no-cache bash

ADD ./scripts /app

WORKDIR /app

ENTRYPOINT ["bash"]