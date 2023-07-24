#!/bin/sh

cd ..
git clone git@github.com:mohamedhany01/mohamedhany01.github.io.git
cd personal-website-src || exit 0

npm run build

cp -r ./dist/* ../mohamedhany01.github.io
cd ../mohamedhany01.github.io || exit 0

git add .
echo "Commite Message?"
read commitMsg
git commit -m "${commitMsg}"
git push

cd ../personal-website-src || exit 0
rm -rf dist