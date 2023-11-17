#!/bin/bash

# BUILD FRONT AND COPY IT TO BACKEND/SRC/PUBLIC

# Navigate to the frontend directory
cd ./truco-front

# install packages
npm install

# Run the npm build script
npm run build

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Frontend build successful. Copying files to backend."

    # Navigate back to the original directory
    cd ..

    rm -rf ./truco-back/src/public/
    # Copy the contents of frontend/dist to backend/src/public
    cp -r ./truco-front/dist/ ./truco-back/src/public/

    echo "Copy completed."
else
    echo "Frontend build failed. Aborting copy to backend."
fi

# COMPILE BACKEND AND RUN IT

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
