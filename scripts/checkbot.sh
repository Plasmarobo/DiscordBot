#!/bin/bash
service=discord_bot

if (( $(ps -ef | grep -v grep | grep $service | wc -l) > 0 )) 
then
echo "$service alive"
else
/usr/sbin/service $service start
fi
