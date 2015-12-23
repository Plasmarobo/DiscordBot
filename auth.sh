echo "Email:"
read DISCORD_EMAIL
export DISCORD_EMAIL=$DISCORD_EMAIL
echo "Password:"
read DISCORD_PASSWORD
export DISCORD_PASSWORD=$DISCORD_PASSWORD
echo "Starting"
nodejs discord_bot.js