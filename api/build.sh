#!/bin/bash

cd "$(dirname "$0")"
set -e

if [[ " $* " == *" --help "* ]]; then
  echo "Использование: ./build.sh [--force]"
  echo "  --force         Перед началом сборки удалить папку build"
  echo "Нужна установленная Java и wget"
  exit 0
fi

echo "Checking for required tools"
if ! command -v java &> /dev/null; then
  echo "Java is required!"
  exit 1
fi

if ! command -v wget &> /dev/null; then
  echo "wget is required!"
  exit 1
fi

if [[ " $* " == *" --force "* ]]; then
  echo "Forcing the build"
  rm -rf build
fi

echo "Preparing the build environment"
if [ ! -d "build" ]; then
  mkdir build
fi

echo "Downloading OpenAPI Generator CLI"
if [ ! -f "build/openapi-generator-cli.jar" ]; then
  wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.9.0/openapi-generator-cli-7.9.0.jar\
    -O build/openapi-generator-cli.jar
fi
declare -a pids

{
  echo "Generating js API client"
  java -jar ./build/openapi-generator-cli.jar generate\
    -i ./api.yaml\
    -g typescript-angular\
    -o ../front/pursit-api-ts
#  (cd build/pursit-api-ts && npm install && npm run build)
  echo "js API client build completed"
} & pids+=($!)

{
  echo "Generating Java API server"
  java -jar ./build/openapi-generator-cli.jar generate\
    -i ./api.yaml\
    -g spring\
    -o ./build/pursit-api-java\
    -c ./config/java-spring.yaml
  echo "Building Java API server"
  (cd build/pursit-api-java && mvn clean install)
  echo "Java API server build completed"
} & pids+=($!)

for pid in "${pids[@]}"; do
  wait "$pid"
done

echo "Build completed"