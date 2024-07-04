#!/bin/bash
fatal () { printf "\n  Error: $1\n\n" 1>&2; exit 1; }
setCwdToFileLocation () { cd "$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )"; }
tryLoadDotEnv () { if [ -f $1 ]; then set -a; source $1; set +a; fi }
assertEnv () { env_var=$1; if [[ -z "${!env_var}" ]];  then fatal "Must provide $env_var in environment"; fi }
assertDockerRunning () { if ! docker info > /dev/null 2>&1; then fatal "This script uses docker, and it isn't running - please start docker and try again!"; fi }
safeRemoveDockerContainer () { docker rm -f $1 &>/dev/null; }

# paths are relative to this file
DOTENV_FILE_PATH="../.env"
OUTPUT_DIR_PATH="../src/i18n/locales"
DOCKER_CONTAINER_NAME="mgo-lokalise-download"

echo "Download i18n files from Lokalise 🌍"

setCwdToFileLocation
tryLoadDotEnv $DOTENV_FILE_PATH
assertEnv "LOKALISE_API_TOKEN"
assertEnv "LOKALISE_PROJECT_ID"
assertDockerRunning

cd $OUTPUT_DIR_PATH

rm *.json

# See CLI options here: https://github.com/lokalise/lokalise-cli-2-go/blob/main/docs/lokalise2_file_download.md
# File format options: https://developers.lokalise.com/reference/api-file-formats
echo "⬇️ Starting download..."
safeRemoveDockerContainer $DOCKER_CONTAINER_NAME
docker run \
    --name $DOCKER_CONTAINER_NAME \
    -v $(pwd):/opt/dest \
    lokalise/lokalise-cli-2 lokalise2 \
    --token $LOKALISE_API_TOKEN \
    --project-id $LOKALISE_PROJECT_ID \
    file download \
    --format json \
    --placeholder-format icu \
    --plural-format icu \
    --directory-prefix "" \
    --unzip-to /opt/dest 

if [ $(docker inspect $DOCKER_CONTAINER_NAME --format='{{.State.ExitCode}}') -ne 0 ]; then
    fatal "🚨 Failed to download files from Lokalise";
fi

safeRemoveDockerContainer $DOCKER_CONTAINER_NAME

# Ensures the correct owner is set for the CI runner
for filename in *.json; do
    if [ ! -O "$filename" ]; then
        sudo chown $USER $filename
    fi
done

echo "✨ Done! ✨"

