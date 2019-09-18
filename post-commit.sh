#!/bin/bash

version=`git diff HEAD^..HEAD -- "$(git rev-parse --show-toplevel)"/package.json | grep '^\+.*version' | sed -s 's/[^0-9\.]//g'`

function create_tag() {
    git tag -a "$1" -m "`git log -1 --format=%s`"
    echo "Created a new tag, $1"
}

function is_exist_tag() {
    for t in `git tag -l` ;do
        if [ "$t" == "$1" ]; then
            echo "true"
            return
        fi
    done

    echo "false"
}

function is_master() {
    git branch --list |grep "\* master" 2>&1 > /dev/null
    if [ $? eq 0 ]; then
        echo "true"
    else
        echo "false"
    fi
}

if [ "$version" != "" ]; then
    local new_tag="v${version}"
    if [ `is_master` == "true" -a `is_exist_tag ${new_tag}` == "false" ]; then
        create_tag ${new_tag}
        exit 1
    fi
fi

exit 0
