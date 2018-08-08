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

output "arn" {
  value = "${aws_iam_role.lambda_role.arn}"
}
