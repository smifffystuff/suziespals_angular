//RESOURCE

resource "aws_api_gateway_resource" "posts" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "posts"
}

// GET METHOD
resource "aws_api_gateway_method" "posts_get" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.posts.id}"
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "posts_get" {
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.posts.id}"
  http_method             = "${aws_api_gateway_method.posts_get.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${var.get_all_posts_lambda_arn}/invocations"
}

resource "aws_api_gateway_method_response" "posts_get_200" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.posts.id}"
  http_method = "${aws_api_gateway_method.posts_get.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "posts_get" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.posts.id}"
  http_method = "${aws_api_gateway_method.posts_get.http_method}"
  status_code = "${aws_api_gateway_method_response.posts_get_200.status_code}"

  response_parameters {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates {
    "application/json" = <<EOF

EOF
  }

  depends_on = [
    "aws_api_gateway_integration.posts_get",
  ]
}

// OPTIONS METHOD

resource "aws_api_gateway_integration_response" "posts_options" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.posts.id}"
  http_method = "${aws_api_gateway_method.posts_options.http_method}"
  status_code = "${aws_api_gateway_method_response.posts_options_200.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [
    "aws_api_gateway_integration.posts_get",
  ]
}

resource "aws_api_gateway_method" "posts_options" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.posts.id}"
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "posts_options" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.posts.id}"
  http_method = "${aws_api_gateway_method.posts_options.http_method}"
  type        = "MOCK"

  request_templates {
    "application/json" = <<EOF
{"statusCode": 200}
EOF
  }
}

resource "aws_api_gateway_method_response" "posts_options_200" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.posts.id}"
  http_method = "${aws_api_gateway_method.posts_options.http_method}"
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

// Permissions
resource "aws_lambda_permission" "posts_get" {
  statement_id  = "posts_get"
  action        = "lambda:InvokeFunction"
  function_name = "${var.get_all_posts_lambda_arn}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:us-east-1:240400571745:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.posts_get.http_method}${aws_api_gateway_resource.posts.path}"
}
