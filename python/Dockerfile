FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install \
  python3 python3-pip && \
  python3 --version && \
  pip --version && \
  rm -rf /var/lib/apt/lists/*
