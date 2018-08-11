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

resource "aws_cognito_identity_pool" "ip" {
  identity_pool_name               = "${var.pool_name} identity pool"
  allow_unauthenticated_identities = true

  cognito_identity_providers {
    client_id               = "${aws_cognito_user_pool_client.client.id}"
    provider_name           = "cognito-idp.us-east-1.amazonaws.com/${aws_cognito_user_pool.pool.id}"
    server_side_token_check = true
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "auth" {
  identity_pool_id = "${aws_cognito_identity_pool.ip.id}"

  # role_mapping {
  #   identity_provider         = "cognito-idp.us-east-1.amazonaws.com/${aws_cognito_user_pool.pool.id}:aws_cognito_user_pool_client.client.id"
  #   ambiguous_role_resolution = "AuthenticatedRole"
  #   type                      = "Rules"


  #   # mapping_rule {
  #   #   claim      = "isAdmin"
  #   #   match_type = "Equals"
  #   #   role_arn   = "${var.ip_auth_arn}"
  #   #   value      = "paid"
  #   # }
  # }

  roles {
    "authenticated" = "${var.ip_auth_arn}"
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "unauth" {
  identity_pool_id = "${aws_cognito_identity_pool.ip.id}"

  # role_mapping {
  #   identity_provider         = "cognito-idp.us-east-1.amazonaws.com/${aws_cognito_user_pool.pool.id}:aws_cognito_user_pool_client.client.id"
  #   ambiguous_role_resolution = "AuthenticatedRole"
  #   type                      = "Rules"


  #   # mapping_rule {
  #   #   claim      = "isAdmin"
  #   #   match_type = "Equals"
  #   #   role_arn   = "${var.ip_unauth_arn}"
  #   #   value      = "paid"
  #   # }
  # }

  roles {
    "unauthenticated" = "${var.ip_unauth_arn}"
  }
}

output "user_pool_id" {
  value = "${aws_cognito_user_pool.pool.id}"
}

output "ip_id" {
  value = "${aws_cognito_identity_pool.ip.id}"
}

output "app_client_id" {
  value = "${aws_cognito_user_pool_client.client.id}"
}
