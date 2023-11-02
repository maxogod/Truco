# Truco

Play truco in truco.com, the best card game to play 1v1, 2v2 or 3v3

## How to run locally (linux)

you will first need to `npm install` all dependencies of both the backend and frontend..

```shell
./run-locally.sh
```

## How to run with docker (recommended)

```shell
./build-front2back.sh

cd ./truco-back/

sudo docker build -t truco-img .
sudo docker run -p 8080:8080 --name truco-app truco-img

# to stop container
sudo docker stop truco-app

# to start it again (once it's built)
sudo docker start truco-app
```

