# Truco

Play truco in truco.com, the best card game to play 1v1, 2v2 or 3v3

## How to run locally (linux)

you will first need to `npm install` all dependencies of both the backend and frontend..

```shell
cd ./truco-front/
npm run build # -> this will generate a dist folder in the current dir
# or npm run dev if you want to run the frontend only

cd ../truco-back/
npm run build # -> this will generate a dist folder in the current dir 

# copy the contents of ./truco-front/dist/ into ./truco-back/dist/public/
cd ..
cp -r ./truco-front/dist/ ./truco-back/dist/public

cd ./truco-back/
npm run start # this will run the production ready compiled app locally in port 8080
```

## How to run with docker (recommended)

