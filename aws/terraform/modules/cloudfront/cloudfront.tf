data "aws_acm_certificate" "website" {
  domain = "suziespals.co.uk"
}

output "cert_arn" {
  value = "${data.aws_acm_certificate.website.arn}"
}
