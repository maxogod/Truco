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

## How to run locally

**(BETTER FOR DEVELOPMENT)** Run two servers in two different terminals one for the [backend](./truco-back/README.md) and another one for the [frontend](./truco-front/README.md). *(click the links to see how)*

Alternatively if you want to **test a prod-like** version of the app locally use the following commands (this integrates the frontend and backend together)

```shell
./run-locally.sh # LINUX. Runs the whole app in one prod-like local server
./run-locally.ps1 # WINDOWS. Runs the whole app in one prod-like local server
```


## How to run with docker (prod ready)
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
