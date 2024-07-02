#!/bin/bash
fatal () { printf "\n  Error: $1\n\n" 1>&2; exit 1; }
setCwdToFileLocation () { cd "$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )"; }
tryLoadDotEnv () { if [ -f $1 ]; then set -a; source $1; set +a; fi }
assertEnv () { env_var=$1; if [[ -z "${!env_var}" ]];  then fatal "Must provide $env_var in environment"; fi }

# paths are relative to this file
DOTENV_FILE_PATH="../.env"
OUTPUT_DIR_PATH="../src/i18n/locales"

echo "Update i18n files from Lokalise 🌍"

setCwdToFileLocation
tryLoadDotEnv $DOTENV_FILE_PATH
assertEnv "LOKALISE_API_TOKEN"
assertEnv "LOKALISE_PROJECT_ID"

cd $OUTPUT_DIR_PATH

# See CLI options here: https://github.com/lokalise/lokalise-cli-2-go/blob/main/docs/lokalise2_file_download.md
# File format options: https://developers.lokalise.com/reference/api-file-formats
echo "Starting download..."
docker run \
    -v $(pwd):/opt/dest \
    lokalise/lokalise-cli-2 lokalise2 \
    --token $LOKALISE_API_TOKEN \
    --project-id $LOKALISE_PROJECT_ID \
    file download \
    --format json_structured \
    --placeholder-format icu \
    --plural-format icu \
    --directory-prefix "" \
    --unzip-to /opt/dest

echo "✨ Done! ✨"
