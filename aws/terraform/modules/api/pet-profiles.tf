resource "aws_api_gateway_resource" "pet_profiles" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "pet-profile"
}

resource "aws_api_gateway_method" "pet_profiles_post" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.pet_profiles.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "pet_profiles_post" {
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.pet_profiles.id}"
  http_method             = "${aws_api_gateway_method.pet_profiles_post.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${var.create_pet_profile_lambda_arn}/invocations"
}

resource "aws_lambda_permission" "pet_profiles" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.create_pet_profile_lambda_arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:us-east-1:240400571745:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.pet_profiles_post.http_method}${aws_api_gateway_resource.pet_profiles.path}"
}

resource "aws_api_gateway_method_response" "pet_profiles_post_200" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.pet_profiles.id}"
  http_method = "${aws_api_gateway_method.pet_profiles_post.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "pet_profiles_post" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.pet_profiles.id}"
  http_method = "${aws_api_gateway_method.pet_profiles_post.http_method}"
  status_code = "${aws_api_gateway_method_response.pet_profiles_post_200.status_code}"

  depends_on = [
    "aws_api_gateway_integration.pet_profiles_post",
  ]
}
