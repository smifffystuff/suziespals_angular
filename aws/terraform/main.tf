provider "aws" {
  region     = "${var.region}"
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
}

module "rds" {
  source  = "./modules/rds"
  db_name = "${var.db_name}"
}
