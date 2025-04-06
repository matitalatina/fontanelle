VERSION=$(shell git log -1 --pretty=%h)

deploy:
	ssh serina-deb '~/repos/fontanelle/ops/deploy.sh'

docker-load-remote:
	docker buildx build --platform=linux/amd64 -t fontanelle:${VERSION} -o type=docker,dest=- . | gzip | ssh serina-deb 'docker load'

docker-deploy: docker-load-remote
	ssh -t serina-deb 'cd ~/repos/fontanelle && VERSION=$(VERSION) docker compose up -d'
