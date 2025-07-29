.PHONY: all test start build docker up

all: install build

install:
	npm ci

build:
	npm run build

test:
	npm test

start: build
	node index.js

docker:
	docker build -t flappy-bird .

up: docker
	-docker stop flappy-bird-container
	-docker rm flappy-bird-container
	docker run -d -p 3000:3000 --name flappy-bird-container flappy-bird

down:
	-docker stop flappy-bird-container
	-docker rm flappy-bird-container

