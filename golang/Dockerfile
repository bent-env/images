FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install wget tar && \
  wget https://go.dev/dl/go1.18.2.linux-386.tar.gz && \
  tar -xzvf go*.linux-386.tar.gz && \
  rm -rf go*.linux-386.tar.gz && \
  echo "export PATH=\$PATH:/go/bin" >> ~/.bashrc && \
  export PATH=$PATH:/go/bin && \
  go version && \
  rm -rf /var/lib/apt/lists/*
