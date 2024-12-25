#!/bin/bash

# set the working directory
WORKDIR=$(pwd)
INFRA_DIR="${WORKDIR}/infra"

# setting up the infrastructure
echo "Destroying the infrastructure..."
cd "${INFRA_DIR}" || exit
cdk destroy