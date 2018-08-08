resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.name}_api"
  description = "${var.name} API interface to lambda functions"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}
