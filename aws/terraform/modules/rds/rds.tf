resource "aws_db_subnet_group" "default" {
  name       = "${var.db_name}-subnet-group"
  subnet_ids = ["${var.subnet_ids}"]

  tags {
    Name = "My DB subnet group"
  }
}

resource "aws_db_instance" "default" {
  allocated_storage      = 10
  storage_type           = "gp2"
  engine                 = "mysql"
  engine_version         = "5.7"
  instance_class         = "db.t2.micro"
  allocated_storage      = 20
  identifier             = "${var.db_name}-instance"
  name                   = "${var.db_name}"
  username               = "foo"
  password               = "foobarbaz"
  parameter_group_name   = "default.mysql5.7"
  apply_immediately      = true
  username               = "${var.db_username}"
  password               = "${var.db_password}"
  publicly_accessible    = true
  skip_final_snapshot    = true
  vpc_security_group_ids = ["${var.sg_id}"]
  db_subnet_group_name   = "${aws_db_subnet_group.default.name}"

  provisioner "local-exec" {
    command     = "/Users/martin/website/suziespals-ang/aws/sql/build.js"
    interpreter = ["node"]
  }
}

resource "null_resource" "build" {
  triggers = {
    policy_sha1 = "${sha1(file("/Users/martin/website/suziespals-ang/aws/sql/suziespals_tables.sql"))}"
  }

  provisioner "local-exec" {
    command     = "/Users/martin/website/suziespals-ang/aws/sql/build.js"
    interpreter = ["node"]
  }
}

output "db_endpoint" {
  value = "${aws_db_instance.default.endpoint}"
}
