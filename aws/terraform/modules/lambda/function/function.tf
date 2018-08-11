resource "aws_lambda_function" "function" {
  function_name    = "${var.function_name}"
  filename         = "${var.file_name}"
  role             = "${var.iam_role_arn}"
  handler          = "index.handler"
  source_code_hash = "${var.source_code_hash}"
  runtime          = "nodejs8.10"

  vpc_config = {
    subnet_ids = ["${var.subnet_ids}"]

    security_group_ids = [
      "sg-955cd1e4",
    ]
  }
}

output "arn" {
  value = "${aws_lambda_function.function.arn}"
}
