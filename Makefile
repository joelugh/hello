install:
	docker-compose -f docker-compose.build.dev.yml run --rm install
dev:
	docker-compose -f docker-compose.dev.yml up