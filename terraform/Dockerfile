FROM --platform=linux/386 bent:debian

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install wget unzip && \
  wget https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_linux_386.zip && \
  unzip terraform_*_linux_386.zip && \
  rm -rf terraform_*_linux_386.zip && \
  chmod +x terraform && \
  mv terraform usr/local/bin/ && \
  terraform -version && \
  rm -rf /var/lib/apt/lists/*
