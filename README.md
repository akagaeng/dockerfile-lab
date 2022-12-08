# dockerfile-lab

## Overview

Experiment how efficient best practices for writing Dockerfiles

## Analysis

### Disk Usage

```shell
dist/           #   4 KB
node_modules/   # 123 MB - CASE yarn install
node_modules/   #  18 MB - CASE yarn install --production
src/            #   2 KB
LICENSE         #   1 KB
yarn.lock       # 100 KB
package.json    #   2 KB
tsconfig.json   # 714 B
README.md       # 205 B
```

### Dockerfile Instructions

* use `node:18-alpine3.16` as a base image
* install packages including [azure-cli](https://pypi.org/project/azure-cli/)
* install project packages
* build project
* run start command

### Docker Images

* Base image `node:18-alpine3.16` size: `165MB`

| Dockerfile       | RUN lines | Build Stage | Image Size | Build Duration |
|------------------|-----------|-------------|------------|----------------|
| dockerfile-lab-1 | Multiple  | Single      | `2.47 GB`  | `167.9s`       |
| dockerfile-lab-2 | Single    | Single      | `2.46 GB`  | `174.9s`       |
| dockerfile-lab-3 | Single    | Multiple    | `2.35 GB`  | `140.3s`       |

### Result

* **Single-lined** got smaller image size but longer build duration than **multi-lined**
* **Multi-staged** got smaller image size but longer build duration than **single-staged**

## Useful commands

### For all services

```shell
# Run all 
docker-compose up -d
# Run all with build
docker-compose up -d --build
# Build image
docker-compose build
# Build image without cache
docker-compose build --no-cache
```

### For a specific service

```shell
# Run only dockerfile-lab-1
docker-compose up -d dockerfile-lab-1
# Run only dockerfile-lab-1 with build
docker-compose up -d dockerfile-lab-1 --build
# Build image
docker-compose build dockerfile-lab-1
# Build image without cache
docker-compose build dockerfile-lab-1 --no-cache
```

## Reference

* [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices)
* [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
* [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
