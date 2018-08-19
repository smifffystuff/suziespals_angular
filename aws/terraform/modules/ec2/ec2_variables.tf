variable "region" {}
variable "name" {}

variable "sg_id" {}

variable "ami" {
  default = "ami-cfe4b2b0"
}

variable "vpc" {
  default = "vpc-09189870"
}

variable "subnet" {
  default = "subnet-4176f16d"
}
