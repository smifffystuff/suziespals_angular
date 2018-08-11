resource "aws_iam_policy" "s3" {
  name        = "${var.name}-s3"
  path        = "/"
  description = ""

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    },
    {
      "Sid": "vpnaccess",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeNetworkInterfaces",
        "ec2:CreateNetworkInterface",
        "ec2:DeleteNetworkInterface"
      ],
      "Resource": "*"
    }
  ]
}
POLICY
}

resource "aws_iam_policy_attachment" "s3-policy-attachment" {
  name       = "${var.name}-s3-policy-attachment"
  policy_arn = "arn:aws:iam::240400571745:policy/${var.name}-s3"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.lambda_role.name}"]
}

resource "aws_iam_policy_attachment" "AWSLambdaBasicExecutionRole-policy-attachment" {
  name       = "AWSLambdaBasicExecutionRole-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.lambda_role.name}"]
}

resource "aws_iam_role" "lambda_role" {
  name = "${var.name}_lambda_role"
  path = "/"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

resource "aws_iam_role" "cognito_unauth" {
  name = "Cognito_${var.name}Unauth_Role"
  path = "/"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${var.ip_id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "unauthenticated"
        }
      }
    }
  ]
}
POLICY
}

resource "aws_iam_policy" "cognito_unauth_policy" {
  name        = "Cognito_${var.name}Unauth_RolePolicy"
  path        = "/"
  description = ""

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
POLICY
}

resource "aws_iam_policy_attachment" "cognito-unauth-policy-attachment" {
  name       = "Cognito_${var.name}Unauth-policy-attachment"
  policy_arn = "${aws_iam_policy.cognito_unauth_policy.arn}"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.cognito_unauth.name}"]
}

resource "aws_iam_role" "cognito_auth" {
  name = "Cognito_${var.name}Auth_Role"
  path = "/"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "${var.ip_id}"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
POLICY
}

resource "aws_iam_policy" "cognito_auth_policy" {
  name        = "Cognito_${var.name}Auth_RolePolicy"
  path        = "/"
  description = ""

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
POLICY
}

resource "aws_iam_policy_attachment" "cognito-auth-policy-attachment" {
  name       = "Cognito_${var.name}Authuth-policy-attachment"
  policy_arn = "${aws_iam_policy.cognito_auth_policy.arn}"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.cognito_auth.name}"]
}

output "lambda_role_arn" {
  value = "${aws_iam_role.lambda_role.arn}"
}

output "ip_auth_arn" {
  value = "${aws_iam_role.cognito_auth.arn}"
}

output "ip_unauth_arn" {
  value = "${aws_iam_role.cognito_unauth.arn}"
}
