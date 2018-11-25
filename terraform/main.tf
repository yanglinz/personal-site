provider "aws" {
  region  = "us-east-1"
  profile = "personal-site"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "personal-site-assets"
  acl    = "public-read"
}
