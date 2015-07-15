#!/bin/bash

set -e

browserify -t coffeeify  --extension=".coffee" --no-bundle-external --node src/index.coffee > index.js
