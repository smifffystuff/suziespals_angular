provider "aws" {
  region     = "${var.region}"
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
}

module "sg" {
  source  = "./modules/sg"
  sg_name = "${var.site_name}"
}

module "iam" {
  source = "./modules/iam"
  name   = "${var.site_name}"
  ip_id  = "${module.cognito.ip_id}"
}

module "rds" {
  source       = "./modules/rds"
  db_name      = "${var.site_name}"
  sg_id        = "${module.sg.mysql_sg_id}"
  build_tables = "${var.build_tables}"
  db_username  = "${var.db_username}"
  db_password  = "${var.db_password}"
}

module "lambda" {
  source       = "./modules/lambda"
  name         = "${var.site_name}"
  iam_role_arn = "${module.iam.lambda_role_arn}"
}

module "cognito" {
  source = "./modules/cognito"

  pool_name     = "${var.site_name}"
  ip_auth_arn   = "${module.iam.ip_auth_arn}"
  ip_unauth_arn = "${module.iam.ip_unauth_arn}"
}

module "api" {
  source                    = "./modules/api"
  name                      = "${var.site_name}"
  create_pet_lambda_arn     = "${module.lambda.create_pet_lambda_arn}"
  create_profile_lambda_arn = "${module.lambda.create_profile_lambda_arn}"
  get_profile_lambda_arn    = "${module.lambda.get_profile_lambda_arn}"
  get_all_posts_lambda_arn  = "${module.lambda.get_all_posts_lambda_arn}"
  user_pool_id              = "${module.cognito.user_pool_id}"
}

output "db_endpoint" {
  value = "${module.rds.db_endpoint}"
}

output "user_pool_id" {
  value = "${module.cognito.user_pool_id}"
}

output "app_client_id" {
  value = "${module.cognito.app_client_id}"
}

output "api_endpoint" {
  value = "${module.api.api_endpoint}"
}

output "identity_pool_id" {
  value = "${module.cognito.ip_id}"
}
