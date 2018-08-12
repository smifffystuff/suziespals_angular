resource "aws_api_gateway_authorizer" "auth" {
  name            = "suziespals_cognito"
  rest_api_id     = "${aws_api_gateway_rest_api.api.id}"
  identity_source = "method.request.header.Authorization"
  type            = "COGNITO_USER_POOLS"

  provider_arns = [
    "arn:aws:cognito-idp:us-east-1:240400571745:userpool/${var.user_pool_id}",
  ]
}

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}_api"
  description = "${var.name} API interface to lambda functions"

  endpoint_configuration {
    types = ["EDGE"]
  }
}

resource "aws_api_gateway_deployment" "api" {
  depends_on = [
    "aws_api_gateway_integration.profile_post",
    "aws_api_gateway_integration.profile_get",
    "aws_api_gateway_integration.profile_options",
    "aws_api_gateway_integration.pets_post",
    "aws_api_gateway_integration.pets_options",
    "aws_api_gateway_integration.posts_get",
    "aws_api_gateway_integration.posts_options",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "api"

  variables = {
    "deployed" = "${timestamp()}"
  }
}

# resource "aws_api_gateway_domain_name" "api" {
#   domain_name = "api.suziespals.co.uk"

#   certificate_arn = "arn:aws:acm:us-east-1:240400571745:certificate/fd6fadf9-4714-4ade-9839-47f95d9b24b2"
# }

# resource "aws_api_gateway_base_path_mapping" "api" {
#   api_id      = "${aws_api_gateway_rest_api.api.id}"
#   stage_name  = "${aws_api_gateway_deployment.dev.stage_name}"
#   domain_name = "${aws_api_gateway_domain_name.api.domain_name}"
#   base_path   = "v1"
# }

# resource "aws_route53_record" "api" {
#   zone_id = "Z1PYB6MQCGX708"

#   name = "${aws_api_gateway_domain_name.api.domain_name}"
#   type = "A"

#   alias {
#     name                   = "${aws_api_gateway_domain_name.api.cloudfront_domain_name}"
#     zone_id                = "${aws_api_gateway_domain_name.api.cloudfront_zone_id}"
#     evaluate_target_health = true
#   }
# }

output "api_endpoint" {
  value = "${aws_api_gateway_deployment.api.invoke_url}"
}
