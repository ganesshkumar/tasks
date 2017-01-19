#!/bin/sh
set -e

meteor build --architecture=os.linux.x86_64 build

cd build && tar -zxvf tasks.tar.gz && cd ..
docker build -t ganesshkumar/tasks .

# meteor doesn't want the build directory to be present under the root folder
rm -rf build
