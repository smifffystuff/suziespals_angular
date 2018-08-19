variable "site_name" {
  default = "suziespals"
}

variable "build_tables" {
  default = "09:58"
}

variable "vpc_id" {
  default = "vpc-09189870"
}

data "aws_subnet_ids" "main" {
  vpc_id = "${var.vpc_id}"
}
