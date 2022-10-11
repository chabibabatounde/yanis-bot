git pull
pm2 stop yanis_bot_9023
pm2 start app.js -n yanis_bot_9023 -l log.json --log-type json -- --port 9023
pm2 reload yanis_bot_9023
pm2 restart yanis_bot_9023
