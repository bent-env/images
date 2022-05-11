#! /usr/bin/env bash

set -eux

TAG=${1:-debian}

BASE=$(dirname "$0")/..
ROOT=$BASE/dist/$TAG
OUT_ROOTFS_TAR=$ROOT/$TAG-9p-rootfs.tar
OUT_ROOTFS_FLAT=$ROOT/$TAG-9p-rootfs-flat
OUT_FSJSON=$ROOT/$TAG-base-fs.json
IMAGE_NAME=bent:$TAG
CONTAINER_NAME=bent-$TAG-container

mkdir -p $ROOT
docker rm "$CONTAINER_NAME" || true
docker create --rm -it --name "$CONTAINER_NAME" "$IMAGE_NAME" bash
docker export "$CONTAINER_NAME" > "$OUT_ROOTFS_TAR"
$BASE/scripts/fs2json.py --out "$OUT_FSJSON" "$OUT_ROOTFS_TAR"
mkdir -p "$OUT_ROOTFS_FLAT"
$BASE/scripts/copy-to-sha256.py "$OUT_ROOTFS_TAR" "$OUT_ROOTFS_FLAT"
echo "$OUT_ROOTFS_TAR", "$OUT_ROOTFS_FLAT" and "$OUT_FSJSON" created.
