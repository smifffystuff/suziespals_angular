terraform {
  backend "s3" {
    bucket  = "suziespals-tf-state"
    key     = "terraform"
    region  = "us-east-1"
    profile = "terraform"
  }
}

provider "aws" {
  region     = "${var.region}"
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
}

module "sg" {
  source = "./modules/sg"

  region  = "${var.region}"
  sg_name = "${var.site_name}"
  vpc_id  = "${var.vpc_id}"
}

module "s3" {
  source = "./modules/s3"

  region    = "${var.region}"
  site_name = "${var.site_name}"
}

module "dns" {
  source = "./modules/route53"

  region            = "${var.region}"
  site_name         = "${var.site_name}"
  s3_main_host_name = "${module.s3.main_web_endpoint}"
  s3_main_zone_id   = "${module.s3.main_hosted_zone_id}"
  s3_www_host_name  = "${module.s3.www_web_endpoint}"
  s3_www_zone_id    = "${module.s3.www_hosted_zone_id}"
}

module "iam" {
  source = "./modules/iam"

  region = "${var.region}"
  name   = "${var.site_name}"
  ip_id  = "${module.cognito.ip_id}"
}

module "rds" {
  source = "./modules/rds"

  region       = "${var.region}"
  db_name      = "${var.site_name}"
  sg_id        = "${module.sg.mysql_sg_id}"
  build_tables = "${var.build_tables}"
  db_username  = "${var.db_username}"
  db_password  = "${var.db_password}"
  subnet_ids   = "${data.aws_subnet_ids.main.ids}"
}

module "ec2" {
  source = "./modules/ec2"

  region = "${var.region}"
  name   = "${var.site_name}"
  sg_id  = "${module.sg.mysql_sg_id}"
}

module "lambda" {
  source = "./modules/lambda"

  region       = "${var.region}"
  name         = "${var.site_name}"
  iam_role_arn = "${module.iam.lambda_role_arn}"
}

module "cognito" {
  source = "./modules/cognito"

  region        = "${var.region}"
  pool_name     = "${var.site_name}"
  ip_auth_arn   = "${module.iam.ip_auth_arn}"
  ip_unauth_arn = "${module.iam.ip_unauth_arn}"
}

module "api" {
  source = "./modules/api"

  region                   = "${var.region}"
  name                     = "${var.site_name}"
  create_pet_lambda_arn    = "${module.lambda.create_pet_lambda_arn}"
  get_pets_lambda_arn      = "${module.lambda.get_pets_lambda_arn}"
  get_all_posts_lambda_arn = "${module.lambda.get_all_posts_lambda_arn}"
  user_pool_id             = "${module.cognito.user_pool_id}"
}

module "cloudfront" {
  source = "./modules/cloudfront"

  region = "${var.region}"
}
