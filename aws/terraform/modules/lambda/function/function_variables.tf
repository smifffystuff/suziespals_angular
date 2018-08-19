variable "region" {}
variable "function_name" {}
variable "file_name" {}
variable "iam_role_arn" {}

variable "timeout" {
  default = 3
}

variable "subnet_ids" {
  type = "list"
}
