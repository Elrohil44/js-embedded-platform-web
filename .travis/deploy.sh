#!/usr/bin/env sh

git clone git@js-embedded-platform:Elrohil44/js-embedded-platform-cli cli

rm -rf cli/dist && cp dist cli/dist -r

cd cli && git add dist && yarn version --patch && git push
