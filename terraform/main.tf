terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.20"
    }
  }

  required_version = ">= 0.16"
}

provider "aws" {
  profile = "default"
  region  = "us-east-2"
}
