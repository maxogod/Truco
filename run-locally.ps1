
# BUILD FRONT AND COPY IT TO BACKEND/SRC/PUBLIC

# Navigate to the frontend directory
cd .\truco-front

# Install packages
npm install

# Run the npm build script
npm run build

# Check if the build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend build successful. Copying files to backend."

    # Navigate back to the original directory
    cd ..

    # Remove existing files in backend/src/public/
    if (Test-Path ".\truco-back\src\public\") {
        Remove-Item -Recurse -Force .\truco-back\src\public\
    }

    # Copy the contents of frontend/dist to backend/src/public
    xcopy /y /s /e .\truco-front\dist\* .\truco-back\src\public\

    Write-Host "Copy completed."
} else {
    Write-Host "Frontend build failed. Aborting copy to backend."
}

# COMPILE BACKEND AND RUN IT

cd ./truco-back

npm install

npm run build-windows

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend build successful. Starting server."

    npm run start
} else {
    Write-Host "Backend build failed. Aborting server start."
}
