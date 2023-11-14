#!/bin/bash

./build-front2back.sh

# Navigate to the backend directory
cd ./truco-back

# install packages
npm install

# Run the npm build script
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Backend build successful."
    npm run start
else
    echo "Backend build failed."
fi
