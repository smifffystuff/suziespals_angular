variable "function_name" {}
variable "file_name" {}
variable "iam_role_arn" {}
variable "source_code_hash" {}

variable "subnet_ids" {
  type = "list"
}
