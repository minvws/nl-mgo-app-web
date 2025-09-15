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

filterDefinitions() {
    directory=$1
    find ./$directory -type f ! \( -name "zib-*" -o -name "gp-*" -o -name "nl-core-*" -name "StructureDefinition-*" \) -delete
}

# path is relative to this file
DIR_FHIR_DEFINITIONS="../fhir-definitions"

NPM_ID_ZIBS_STU3="nictiz.fhir.nl.stu3.zib2017"
NPM_ID_NL_CORE_R4="nictiz.fhir.nl.r4.nl-core"
NPM_ID_ZIBS_R4="nictiz.fhir.nl.r4.zib2020"

echo "Download fhir structure definition files from Simplifier 🌍"

setCwdToFileLocation

mkdir -p $DIR_FHIR_DEFINITIONS
cd $DIR_FHIR_DEFINITIONS

echo "Deleting old files..."
rm -rf ./*

npmDownload $NPM_ID_ZIBS_STU3 "2.2.18"
npmDownload $NPM_ID_NL_CORE_R4 "0.11.0-beta.1"
npmDownload $NPM_ID_ZIBS_R4 "0.11.0-beta.1"

# Uncomment to remove all files except StructureDefinitions
# filterDefinitions $NPM_ID_ZIBS_STU3
# filterDefinitions $NPM_ID_NL_CORE_R4
# filterDefinitions $NPM_ID_ZIBS_R4

rm -rf ./*.tgz

npx prettier . --write --no-config --ignore-path ""

echo "✨ Done! ✨"