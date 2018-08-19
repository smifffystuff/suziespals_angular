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

output "cert_arn" {
  value = "${module.cloudfront.cert_arn}"
}
