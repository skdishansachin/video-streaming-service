#!/bin/bash

# set the working directory
WORKDIR=$(pwd)
FRONTEND_DIR="${WORKDIR}/frontend"
BACKEND_DIR="${WORKDIR}/backend"
INFRA_DIR="${WORKDIR}/infra"

# Flag to determine if tests should be run
RUN_TESTS=false

# Parse arguments
for arg in "$@"; do
  if [ "$arg" == "--run-tests" ]; then
    RUN_TESTS=true
  fi
done

# Setting up the frontend application
echo "Installing dependencies for frontend dependencies..."
cd "${FRONTEND_DIR}" || exit
pnpm install

echo "Building the frontend application..."
pnpm build

# Setting up the infrastructure
echo "Installing dependencies for infrastructure..."
cd "${INFRA_DIR}" || exit
pnpm install

if [ "$RUN_TESTS" = true ]; then
  echo "Running the tests for infrastructure..."
  pnpm test
fi

echo "Deploying the infrastructure..."
cdk deploy
