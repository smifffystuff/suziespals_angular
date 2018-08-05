resource "aws_security_group" "mysql_sg" {
  name   = "${var.sg_name}-sg"
  vpc_id = "vpc-09189870"
}

resource "aws_security_group_rule" "msql_sg_in" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "TCP"
  cidr_blocks       = ["86.2.19.32/32"]
  security_group_id = "${aws_security_group.mysql_sg.id}"
}

resource "aws_security_group_rule" "msql_sg_out" {
  type              = "egress"
  from_port         = 0
  to_port           = 65535
  protocol          = "TCP"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = "${aws_security_group.mysql_sg.id}"
}

output "mysql_sg_id" {
  value = "${aws_security_group.mysql_sg.id}"
}
