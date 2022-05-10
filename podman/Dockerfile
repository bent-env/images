FROM --platform=linux/386 bent:debian

ENV PODMAN_ARGS "--storage-driver=vfs --cgroup-manager=cgroupfs --events-backend=none"

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install \
  podman crun && \
  # 32 bit podman sanity pull and setup
  echo "alias docker='podman $PODMAN_ARGS'" >> ~/.bashrc && \
  bash -c "podman $PODMAN_ARGS pull docker.io/hello-world" && \
  rm -rf /var/lib/apt/lists/*
