resource "aws_key_pair" "key_pair" {
  key_name   = "${var.name}-key"
  public_key = "${file("${path.module}/../../mykey.pub")}"
}
