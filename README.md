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

1. **Node**: A asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications[^1].
1. **Express**: Minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications[^2].
1. **React**: A JavaScript library for building user interfaces[^3].
1. **Tailwind**: A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup[^4].
1. **MongoDB**: A fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP)[^5].
1. **Pusher**: Pusher Channels is a hosted WebSockets(helps communication between client and server) solution for building powerful realtime interactive apps[^6].

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

optional
********************************************************************
#to check if docker is installed (linux)
docker --version

#to install docker if it isn't installed 
Linux:
sudo snap install docker     # version 20.10.24, or
sudo apt  install docker.io  # version 24.0.5-0ubuntu1~20.04.1

windows:
https://docs.docker.com/desktop/install/windows-install/
********************************************************************

sudo docker build -t truco-img .
sudo docker run -p 8080:8080 --name truco-app truco-img

# to stop container
sudo docker stop truco-app

# to start it again (once it's built)
sudo docker start truco-app
```

Thanks for passing by!

[^1]: [Nodejs documentation](https://nodejs.org/en/about)
[^2]: [Expressjs documentation](https://expressjs.com/)
[^3]: [Reactjs documentation](https://legacy.reactjs.org/)
[^4]: [Tailwind documentation](https://tailwindcss.com/)
[^5]: [MongoDB documentation](https://www.mongodb.com/basics/mongodb-atlas-tutorial#:~:text=MongoDB%20Atlas%20is%20a%20fully,scale%20MongoDB%20in%20the%20cloud.)
[^6]: [Pusher documentation](https://pusher.com/websockets/) 
