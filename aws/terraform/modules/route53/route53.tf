data "aws_route53_zone" "main" {
  name = "${var.site_name}.co.uk."
}

resource "aws_route53_record" "main" {
  zone_id = "${data.aws_route53_zone.main.zone_id}"
  name    = "${var.site_name}.co.uk"
  type    = "A"

  alias = {
    name                   = "${var.s3_main_host_name}"
    zone_id                = "${var.s3_main_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = "${data.aws_route53_zone.main.zone_id}"
  name    = "www.${var.site_name}.co.uk"
  type    = "A"

  alias = {
    name                   = "${var.s3_www_host_name}"
    zone_id                = "${var.s3_www_zone_id}"
    evaluate_target_health = false
  }
}
