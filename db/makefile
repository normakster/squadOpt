build:
	@docker build --rm -t squadOpt-db_mango .
run:
	@docker run --network=isolated_squadOpt --name db -p 27017:27017 squadOpt-db_mongo:latest
stop:
	@docker stop db
clean-data:
	@docker rm -v db
clean-images:
	@docker rmi squadOpt-db_mango:latest
ps:
	@docker ps --filter "name=db"
