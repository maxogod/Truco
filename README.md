# Truco

Play truco on truco.com, the best card game to play 1v1

## About the game

* Open your personal account
* Play online 1v1 matches with strangers
* Win games to increase your rating
* Climb up the global rankings (which will refresh everyday)
* Add your friends and challenge them
* Chat with your opponent as your play
* Check out the rules and the order of strength of the cards (for the newbies)

## Tech stack

* Node + Express for the server
* Pusher for web sockets
* React + Tailwind for the frontend
* MongoDB (MongoAtlas) for the no-sql database

## Extra

### [Contribution Standards](./docs/CONTRIBS.md)

### [Further Details](./docs/FURTHER_DETAILS.md)

### [Game Rules](./docs/RULES.md)

## How to run locally (linux)

```shell
./run-locally.sh
```

## How to run with docker (recommended)
remove sudo if running on windows
```shell

sudo docker build -t truco-img .
sudo docker run -p 8080:8080 --name truco-app truco-img

# to stop container
sudo docker stop truco-app

# to start it again (once it's built)
sudo docker start truco-app
```

Thanks for passing by!
