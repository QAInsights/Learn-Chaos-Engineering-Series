#!/bin/bash
while :
do
	curl -o /dev/null -s -w 'Total: %{time_total}s\n'  $1
	sleep 1
done
