resource "aws_s3_bucket" "images-suziespals-co-uk" {
  bucket = "images.suziespals.co.uk"
  acl    = "private"
}

resource "aws_s3_bucket" "suziespals-co-uk" {
  bucket = "suziespals.co.uk"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::suziespals.co.uk/*"
    }
  ]
}
POLICY
}
