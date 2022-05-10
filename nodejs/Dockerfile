FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install wget tar && \
  wget https://unofficial-builds.nodejs.org/download/release/v16.9.1/node-v16.9.1-linux-x86.tar.gz && \
  tar -xzvf node-v*-linux-x86.tar.gz && \
  rm -rf node-v*-linux-x86.tar.gz && \
  mv node-v*-linux-x86 node && \
  echo "export PATH=\$PATH:/node/bin" >> ~/.bashrc && \
  export PATH=$PATH:/node/bin && \
  npm install -g npm && \
  node --version && \
  npm --version && \
  rm -rf /var/lib/apt/lists/*
