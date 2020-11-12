#!/bin/sh

echo "Deleting old publication"
rm -rf public

echo "Generating site"
hugo

git branch -D deploy

git checkout --orphan deploy
git rm -r --cached
git add -f ./public 
git mv ./public/* ./

git clean -fd

git commit -m "Deploy"
git push --force --set-upstream origin deploy

git checkout master
