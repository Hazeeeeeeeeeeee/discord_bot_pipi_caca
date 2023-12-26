# Pipi Caca Bot for Discord
The Pipi Caca Bot is a fun and interactive Discord bot that allows users to count occurrences of "pipi" and "caca" in messages and view user rankings.

## Installation
### Prerequisites
- Docker and Docker Compose
- Node.js
- A Discord bot token

### Configuration

#### Set Up Environment Variables:
Create a `.env` file at the root of the project and add your Discord bot token:

```
DISCORD_TOKEN=your_discord_token
```

#Build and Start Services with Docker Compose:

At the root of your project, execute:

```
cd src
npm i
cd ..
docker-compose up --build
```