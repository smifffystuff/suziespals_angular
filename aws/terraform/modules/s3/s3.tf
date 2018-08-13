resource "aws_s3_bucket" "images" {
  bucket = "images.${var.site_name}.co.uk"
  acl    = "private"
}

resource "aws_s3_bucket" "main" {
  bucket = "${var.site_name}.co.uk"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  provisioner "local-exec" {
    when = "destroy"
    command = "aws s3 rm --region us-east-1 --profile terraform --recursive s3://suziespals.co.uk/"
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
      "Resource": "arn:aws:s3:::${var.site_name}.co.uk/*"
    }
  ]
}
POLICY
}

resource "aws_s3_bucket" "www" {
  bucket = "www.${var.site_name}.co.uk"
  acl    = "private"

  website {
    redirect_all_requests_to = "${var.site_name}.co.uk"
  }

  provisioner "local-exec" {
    when = "destroy"
    command = "aws s3 rm --region us-east-1 --profile terraform --recursive s3://www.suziespals.co.uk/"
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
      "Resource": "arn:aws:s3:::www.${var.site_name}.co.uk/*"
    }
  ]
}
POLICY
}


output "main_web_endpoint" {
  value = "${aws_s3_bucket.main.website_endpoint}"
}

output "www_web_endpoint" {
  value = "${aws_s3_bucket.www.website_endpoint}"
}

output "main_hosted_zone_id" {
  value = "${aws_s3_bucket.main.hosted_zone_id}"
}

output "www_hosted_zone_id" {
  value = "${aws_s3_bucket.www.hosted_zone_id}"
}
