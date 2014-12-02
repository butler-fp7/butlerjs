#!/bin/sh
param=$1
port=${param:=9000}
rackup notifier.ru -s thin -E production --port=$port