#!/bin/bash

source "$(dirname "$0")/utils.sh"

# paths are relative to the package.json file
DOCKER_CONTAINER_NAME="mgo-lokalise-download"
DOTENV_FILE="./.env"
OUTPUT_APP_DIR="./src/locales/app"
OUTPUT_FHIR_DIR="./src/locales/fhir"

echo "Download i18n files from Lokalise 🌍"

setCwdToPackageJson
loadDotEnv $DOTENV_FILE
assertEnv "LOKALISE_API_TOKEN"
assertEnv "LOKALISE_PROJECT_ID_MGO_APP"
assertEnv "LOKALISE_PROJECT_ID_MGO_FHIR"
assertDockerRunning

safeRemoveDockerContainer $DOCKER_CONTAINER_NAME

downloadLokaliseAssets() {
    project_name=$1
    project_id=$2
    raw_dir_path=$3/raw
    compiled_dir_path=$3/compiled

    printf "\\n⬇️ Downloading \"$project_name\" translations...\\n"

    mkdir -p $raw_dir_path
    mkdir -p $compiled_dir_path
    safeRm "$raw_dir_path/*"
    safeRm "$compiled_dir_path/*"

    printf "\\n"
    # See CLI options here: https://github.com/lokalise/lokalise-cli-2-go/blob/main/docs/lokalise2_file_download.md
    # File format options: https://developers.lokalise.com/reference/api-file-formats
    docker run \
        --name $DOCKER_CONTAINER_NAME \
        -v $(realpath $raw_dir_path):/opt/dest \
        lokalise/lokalise-cli-2 lokalise2 \
        --token $LOKALISE_API_TOKEN \
        --project-id $project_id \
        file download \
        --format json \
        --placeholder-format icu \
        --plural-format icu \
        --directory-prefix "%LANG_ISO%" \
        --unzip-to /opt/dest

    if [ $(docker inspect $DOCKER_CONTAINER_NAME --format='{{.State.ExitCode}}') -ne 0 ]; then
        fatal "🚨 Failed to download files from Lokalise"
    fi

    safeRemoveDockerContainer $DOCKER_CONTAINER_NAME

    # Ensures the correct owner is set for the CI runner
    allJsonFiles=$(find $raw_dir_path -type f -name '*.json')
    for jsonFile in $allJsonFiles; do
        if [ ! -O $jsonFile ]; then
            echo "Updating owner for $jsonFile"
            sudo chown $USER $jsonFile
        fi
    done

    echo "🔃 Compiling \"$project_name\" translations..."

    languageDirs=$(find $raw_dir_path -mindepth 1 -type d)
    for languageDir in $languageDirs; do
        outputDir=${languageDir/"$raw_dir_path"/"$compiled_dir_path"}
        echo "Compiling $languageDir to $outputDir"
        pnpm exec formatjs compile-folder --ast --format ./bin/formatter.js $languageDir $outputDir
    done

    printf "✅ \"$project_name\" translations... done!\\n"
}

downloadLokaliseAssets "mgo-app" $LOKALISE_PROJECT_ID_MGO_APP $OUTPUT_APP_DIR
downloadLokaliseAssets "mgo-fhir" $LOKALISE_PROJECT_ID_MGO_FHIR $OUTPUT_FHIR_DIR

printf "\\n✨ Finished! ✨\\n"
