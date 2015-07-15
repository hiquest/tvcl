#!/bin/bash

set -e

browserify -t coffeeify  --extension=".coffee" --no-bundle-external --node index.coffee > index.js
