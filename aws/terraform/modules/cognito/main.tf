resource "aws_cognito_user_pool" "pool" {
  name = "${var.pool_name}_user_pool"

  auto_verified_attributes = [
    "email",
  ]

  username_attributes = [
    "email",
  ]

  schema = [{
    attribute_data_type = "String"
    name                = "name"
    required            = true

    string_attribute_constraints {
      min_length = 0
      max_length = 50
    }
  }]

  password_policy = {
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    minimum_length    = 8
  }

  email_verification_subject = "Please verify your Suzie's Pals account"
  email_verification_message = "Please return to the logon page and verify your account with the code {####}"
}

resource "aws_cognito_user_pool_client" "client" {
  name = "${var.pool_name}_app_client"

  user_pool_id    = "${aws_cognito_user_pool.pool.id}"
  generate_secret = false
}

output "user_pool_id" {
  value = "${aws_cognito_user_pool.pool.id}"
}

output "app_client_id" {
  value = "${aws_cognito_user_pool_client.client.id}"
}
