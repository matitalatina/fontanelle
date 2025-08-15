VERSION=$(shell git log -1 --pretty=%h)

prepare-db:
	npm run prepare-db

docker-load-remote:
	docker buildx build --platform=linux/amd64 -t fontanelle:${VERSION} -o type=docker,dest=- . | gzip | ssh serina-deb 'docker load'

deploy: docker-load-remote
	ssh -t serina-deb 'cd ~/repos/fontanelle && VERSION=$(VERSION) docker compose up -d'
