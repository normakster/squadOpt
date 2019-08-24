#!/bin/sh

chown -R mongodb:mongodb /data
# exec su-exec mongodb mongod --port 27017 --dbpath /data/db --bind_ip_all
# 0.0.0.0
# 127.0.0.1
