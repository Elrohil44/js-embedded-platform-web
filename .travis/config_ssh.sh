#!/usr/bin/env sh

echo " `pwd`/.travis/deploy_key" >> .travis/.ssh_config
echo >> ~/.ssh/config
cat .travis/.ssh_config >> ~/.ssh/config