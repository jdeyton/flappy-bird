.PHONY: all test start build

all: build

build:
	npm run build

test:
	npm test

start:
	node index.js
