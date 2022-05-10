FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install \
  build-essential make cmake && \
  rm -rf /var/lib/apt/lists/*
