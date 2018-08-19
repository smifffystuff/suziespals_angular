variable "region" {}
variable "db_name" {}
variable "sg_id" {}

variable "db_username" {}

variable "db_password" {}

variable "build_tables" {
  default = false
}

variable "subnet_ids" {
  type = "list"
}
