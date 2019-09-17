#!/bin/bash

version=`git diff HEAD^..HEAD -- "$(git rev-parse --show-toplevel)"/package.json | grep '^\+.*version' | sed -s 's/[^0-9\.]//g'`

function create_tag() {
    git tag -a "v$1" -m "`git log -1 --format=%s`"
    echo "Created a new tag, v$1"
}

if [ "$version" != "" ]; then
    create_tag $version
    exit 1
fi

exit 0
