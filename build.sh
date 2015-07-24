#!/bin/bash

set -e

browserify -t coffeeify  --extension=".coffee" --no-bundle-external --node src/index.coffee > index-tmp.js
echo '#!/usr/bin/env node' > index.js
cat index-tmp.js >> index.js
