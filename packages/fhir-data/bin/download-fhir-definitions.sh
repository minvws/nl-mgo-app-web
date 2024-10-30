#!/bin/bash
fatal() {
    printf "\n  Error: $1\n\n" 1>&2
    exit 1
}
setCwdToFileLocation() { cd "$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)"; }

npmDownload() {
    npm_id=$1
    npm_version=$2
    npm --registry https://packages.simplifier.net pack $npm_id@$npm_version
    mkdir $npm_id
    tar --strip-components=1 --extract --file $npm_id-$npm_version.tgz -C ./$npm_id package
}

# paths are relative to this file
ZIBS_DIR_PATH="../fhir-definitions"
ZIBS_NPM_ID="nictiz.fhir.nl.stu3.zib2017"
ZIBS_NPM_VERSION="2.2.18"

FHIR_NPM_ID="hl7.fhir.r3.core"
FHIR_NPM_VERSION="3.0.2"

echo "Download fhir structure definition files from Simplifier 🌍"

setCwdToFileLocation

mkdir -p $ZIBS_DIR_PATH
cd $ZIBS_DIR_PATH

echo "Deleting old files..."
rm -rf ./*

npmDownload $FHIR_NPM_ID $FHIR_NPM_VERSION
npmDownload $ZIBS_NPM_ID $ZIBS_NPM_VERSION

# Uncomment to remove all files except StructureDefinition and ZIB files
find ./$FHIR_NPM_ID -type f ! \( -name "StructureDefinition-*" \) -delete
find ./$ZIBS_NPM_ID -type f ! \( -name "zib-*" -o -name "gp-*" -o -name "nl-core-*" \) -delete

echo "✨ Done! ✨"
