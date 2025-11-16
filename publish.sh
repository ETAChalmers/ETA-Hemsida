#!/usr/bin/env bash

set -x -e -o pipefail # Show commands executed, exit on error (including subcommands)

# Check if hugo is installed
if ! command -v hugo >/dev/null ; then
    echo "Hugo must be installed to run publish.sh"
    exit 1
fi

# At the end of the script, including if it fails, we want to restore to the master branch
cleanup() {
    git checkout master
}
trap cleanup EXIT

echo "Deleting old publication"
rm -rf public

echo "Generating site"
hugo

echo "Adding files to new branch"
git branch -D deploy || true # git branch -D fails if the branch doesn't exist, supress the error

git checkout --orphan deploy
git add -f ./public
git mv ./public/* ./

git clean -fd

git commit --quiet -m "Deploy"
git push --force --set-upstream origin deploy

