#!/bin/bash

SOURCE_DIR="$(dirname "$(realpath "$0")")"

# Public: Prints an error message and exits the script.
#
# $1 - Error message
#
# Examples
#
#   fatal "Something went wrong"
#
fatal() {
    printf "\n  Error: $1\n\n" 1>&2
    exit 1
}

# Public: Sets the CWD to the directory of the (source) script.
#
resetCwd() {
    cd $SOURCE_DIR
}

# Public: Sets the CWD to the directory of the nearest
#  ancestor package.json as seen from the source file.
setCwdToPackageJson() {
    packageJson="$(cd "$SOURCE_DIR" && findNearestAncestorFile "package.json")"
    if [ -z "$packageJson" ]; then
        fatal "Could not find package.json in $SOURCE_DIR"
    fi

    cd "$(dirname "$packageJson")" || fatal "Failed to cd to package.json directory"
}

# Public: Loads the .env file into the environment.
#
# $1 - Path to the .env file.
#
# Examples
#
#   loadDotEnv "../.env"
#
loadDotEnv() {
    dotEnvPath=$1
    if [ -f $dotEnvPath ]; then
        set -a
        source $dotEnvPath
        set +a
    else
        echo "Did not locate a .env file at: \"$dotEnvPath\""
    fi
}

# Public: Uses "rm -rf" but only if the path is within the git repository.
#
# $1 - File or directory to remove.
#
# Examples
#
#   safeRm "./*"
#
safeRm() {
    git_root=$(
        cd "$SOURCE_DIR" || exit 1
        git rev-parse --show-toplevel
    )
    to_delete="$(realpath $1)"

    if [[ -z $git_root ]]; then
        fatal "No git repository found"
    fi

    if [[ -z $to_delete ]]; then
        fatal "No path provided"
    fi

    if [[ "${to_delete##$git_root}" != "$to_delete" ]]; then
        echo "Deleting..."
        echo "${to_delete//$git_root/ - }"
        rm -rf $to_delete
    else
        fatal "Can not remove files outside of the git repository. \n\trepository: \"$git_root\", \n\tto_delete: \"$to_delete\""
    fi

}

# Public: Asserts that an environment variable is set.
#
# $1 - Environment variable name.
#
# Examples
#
#   assertEnv "MY_ENV_VAR"
#
assertEnv() {
    env_var=$1
    if [[ -z "${!env_var}" ]]; then
        fatal "Must provide $env_var in environment"
    fi
}

# Public: Asserts that Docker is running and available.
#
assertDockerRunning() {
    if ! docker info >/dev/null 2>&1; then
        fatal "This script uses docker, and it isn't running - please start docker and try again!"
    fi
}

# Public: Force remove a docker container
#
# $1 - Docker container to remove.
#
# Examples
#
#   safeRemoveDockerContainer "my-docker-container"
#
safeRemoveDockerContainer() {
    docker rm -f $1 &>/dev/null
}

# Public: Looks for the nearest ancestor of the current directory that contains a file with the given name.
#
# $1 - The file to find
#
# Examples
#
# mkdir -p A/B/C/D/E/F A/good/show
# touch A/good/show/this A/B/C/D/E/F/srchup A/B/C/thefile
# cd A/B/C/D/E/F
# findconfig thefile
# /home/jeff/tmp/iconoclast/A/B/C/thefile
#
findNearestAncestorFile() {
    # from: https://www.npmjs.com/package/find-config#algorithm
    # 1. If X/file.ext exists and is a regular file, return it. STOP
    # 2. If X has a parent directory, change X to parent. GO TO 1
    # 3. Return NULL.
    local target="$1"

    if [ -f "$PWD/$target" ]; then
        printf '%s\n' "$PWD/$target"
        return 0
    fi

    if [ "$PWD" = "/" ]; then
        return 1
    fi

    (
        cd .. || exit 1
        findNearestAncestorFile "$target"
    )
}
