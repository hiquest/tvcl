#!/bin/bash

set -e

npm run build
echo '#!/usr/bin/env node' > index.js
cat index-tmp.js >> index.js
