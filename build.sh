#!/bin/bash
# A basic script to build and compile the typescript files using tsc

# Set an error handler
trap onExit EXIT

# printing the simple stack trace
onExit() {
    while caller $((n++));
    do :;
    done;
}

build() {
    echo 'Start building..'
    # Run tsc
    tsc -p tsconfig.json
    echo 'tsc exist with status code:' $?
    echo 'Copying Other files..'
    cp -rf package.json lib
    cp -rf README.md lib
    echo 'Done.'
    echo '--------'
}

build