FROM --platform=linux/386 bent:debian

ENV TF_IN_AUTOMATION=on

ADD main.tf ws/

RUN apt-get update && \
  apt-get --yes --no-install-recommends --no-install-suggests install wget unzip nano && \
  wget https://releases.hashicorp.com/terraform/1.1.9/terraform_1.1.9_linux_386.zip && \
  unzip terraform_*_linux_386.zip && \
  rm -rf terraform_*_linux_386.zip && \
  chmod +x terraform && \
  mv terraform usr/local/bin/ && \
  terraform -version && \
  cd ws && \
  terraform init -input=false && \
  terraform plan -out=tfplan -input=false && \
  terraform apply -input=false tfplan && \
  rm -rf /var/lib/apt/lists/*

# terraform CLI configuration for v86 runtime
ADD .terraformrc root/
