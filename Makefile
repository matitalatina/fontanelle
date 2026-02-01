VERSION=$(shell git log -1 --pretty=%h)

prepare-db:
	npm run prepare-db

docker-load-remote:
	docker buildx build --platform=linux/amd64 -t fontanelle:${VERSION} -o type=docker,dest=- . | gzip | ssh fun-met-oracle2 'docker load'

deploy: docker-load-remote
	ssh -t fun-met-oracle2 'cd ~/repos/fontanelle && git pull && VERSION=$(VERSION) docker compose up -d'

docker-test:
	docker build -t fontanelle . && docker run -ti -p 3003:3003 fontanelle
