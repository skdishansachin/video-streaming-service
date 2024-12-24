#!/bin/bash

# set the working directory
WORKDIR=$(pwd)
FRONTEND_DIR="${WORKDIR}/frontend"
BACKEND_DIR="${WORKDIR}/backend"
INFRA_DIR="${WORKDIR}/infra"

# setting up the frontend application
echo "Installing dependencies for frontend dependencies..."
cd "${FRONTEND_DIR}" || exit
pnpm install

echo "Building the frontend application..."
pnpm build

# setting up the infrastructure
echo "Installing dependencies for infrastructure..."
cd "${INFRA_DIR}" || exit
pnpm install
echo "Running the tests for infrastructure..."
pnpm test
echo "Deploying the infrastructure..."
cdk deploy
