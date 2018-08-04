resource "aws_iam_policy" "suziespals-s3" {
  name        = "suziespals-s3"
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
    }
  ]
}
POLICY
}

resource "aws_iam_policy_attachment" "suziespals-s3-policy-attachment" {
  name       = "suziespals-s3-policy-attachment"
  policy_arn = "arn:aws:iam::240400571745:policy/suziespals-s3"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.suziespals_lambda_role.name}"]
}

resource "aws_iam_policy_attachment" "suziespals_dynamodb-policy-attachment" {
  name       = "suziespals_dynamodb-policy-attachment"
  policy_arn = "arn:aws:iam::240400571745:policy/suziespals_dynamodb"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.suziespals_lambda_role.name}"]
}

resource "aws_iam_policy_attachment" "AWSLambdaBasicExecutionRole-policy-attachment" {
  name       = "AWSLambdaBasicExecutionRole-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  groups     = []
  users      = []
  roles      = ["${aws_iam_role.suziespals_lambda_role.name}"]
}

resource "aws_iam_role" "suziespals_lambda_role" {
  name = "suziespals_lambda_role"
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
  value = "${aws_iam_role.suziespals_lambda_role.arn}"
}
