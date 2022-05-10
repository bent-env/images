FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install \
  gstreamer1.0-tools gstreamer1.0-plugins-base gstreamer1.0-plugins-good && \
  rm -rf /var/lib/apt/lists/*
