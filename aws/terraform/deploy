#! /bin/bash

terraform init

terraform apply

terraform output -json > ../../config/aws_config.json

cd ../../config/
node update_config.js
