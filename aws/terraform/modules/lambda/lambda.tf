data "aws_subnet_ids" "subnets" {
  vpc_id = "vpc-09189870"
}

resource "aws_lambda_function" "create_pet_profile" {
  function_name    = "${var.name}_api_createPetProfile"
  filename         = "${path.module}/zips/createPetProfile.zip"
  role             = "${var.iam_role_arn}"
  handler          = "index.handler"
  source_code_hash = "${base64sha256(file("${path.module}/zips/createPetProfile.zip"))}"
  runtime          = "nodejs8.10"

  vpc_config = {
    subnet_ids = [
      "${data.aws_subnet_ids.subnets.ids[0]}",
      "${data.aws_subnet_ids.subnets.ids[1]}",
      "${data.aws_subnet_ids.subnets.ids[2]}",
    ]

    security_group_ids = [
      "sg-955cd1e4",
    ]
  }
}

output "create_pet_profile_lambda_arn" {
  value = "${aws_lambda_function.create_pet_profile.arn}"
}

# resource "aws_lambda_function" "get_pet_profile" {
#   function_name    = "suziespals_api_getPetProfile"
#   filename         = "${path.module}/getPetProfile.zip"
#   role             = "${var.iam_role_arn}"
#   handler          = "index.handler"
#   source_code_hash = "${base64sha256(file("${path.module}/getPetProfile.zip"))}"
#   runtime          = "nodejs8.10"


#   environment {
#     variables = {
#       SECRET = "${var.secret}"
#     }
#   }
# }


# resource "aws_lambda_function" "delete_pet_profile" {
#   function_name    = "suziespals_api_deletePetProfile"
#   filename         = "${path.module}/deletePetProfile.zip"
#   role             = "${var.iam_role_arn}"
#   handler          = "index.handler"
#   source_code_hash = "${base64sha256(file("${path.module}/deletePetProfile.zip"))}"
#   runtime          = "nodejs8.10"


#   environment {
#     variables = {
#       SECRET = "${var.secret}"
#     }
#   }
# }


# resource "aws_lambda_function" "get_all_pet_profiles" {
#   function_name    = "suziespals_api_getAllPetProfiles"
#   filename         = "${path.module}/getAllPetProfiles.zip"
#   role             = "${var.iam_role_arn}"
#   handler          = "index.handler"
#   source_code_hash = "${base64sha256(file("${path.module}/getAllPetProfiles.zip"))}"
#   runtime          = "nodejs8.10"


#   environment {
#     variables = {
#       SECRET = "${var.secret}"
#     }
#   }
# }

