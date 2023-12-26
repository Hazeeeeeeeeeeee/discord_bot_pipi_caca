import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import pkg from 'pg'; 
const { Pool } = pkg; 

dotenv.config();

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const pool = new Pool({
    user: 'utilisateur',
    host: 'db', // Utilisez localhost ici
    database: 'monbotdb',
    password: 'motdepasse',
    port: 5432,
});


client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if ((message.content.startsWith('!caca') || message.content.startsWith('!pipi')) && !message.author.bot) {
        const type = message.content.startsWith('!caca') ? 'caca' : 'pipi';
        const username = message.author.username;
        const date = message.createdAt;

        try {
            const query = 'INSERT INTO pipi_caca (type, username, date) VALUES ($1, $2, $3)';
            await pool.query(query, [type, username, date]);
            console.log(`${type} enregistré pour ${username} à ${date}`);
            message.channel.send (`${type} rajouter à ${username}`)
        } catch (err) {
            console.error('Erreur lors de l\'insertion dans la base de données', err);
        }
    }else if (message.content.startsWith('!info') && !message.author.bot) {
        const usernameQuery = message.content.split(" ")[1]; // Extrait le nom d'utilisateur de la commande
        if (!usernameQuery) {
            message.channel.send("Veuillez spécifier un nom d'utilisateur.");
            return;
        }

        try {
            const query = 'SELECT type, COUNT(*) FROM pipi_caca WHERE username = $1 GROUP BY type';
            const res = await pool.query(query, [usernameQuery]);
            let infoMessage = `Informations pour ${usernameQuery}:\n`;
            res.rows.forEach(row => {
                infoMessage += `${row.type}: ${row.count}\n`;
            });
            message.channel.send(infoMessage);
        } catch (err) {
            console.error('Erreur lors de la récupération des informations', err);
            message.channel.send("Une erreur s'est produite lors de la récupération des informations.");
        }

    }else if (message.content.startsWith('!top') && !message.author.bot) {
        const args = message.content.split(" ");
        let query;
        let leaderboardMessage;

        if (args.length === 1 || (args[1] !== 'pipi' && args[1] !== 'caca')) {
            // Classement combiné pour pipi et caca
            query = 'SELECT username, COUNT(*) as count FROM pipi_caca GROUP BY username ORDER BY count DESC LIMIT 3';
            leaderboardMessage = `Top 3 combiné:\n`;
        } else {
            // Classement spécifique pour pipi ou caca
            const typeQuery = args[1];
            query = 'SELECT username, COUNT(*) as count FROM pipi_caca WHERE type = $1 GROUP BY username ORDER BY count DESC LIMIT 3';
            leaderboardMessage = `Top 3 ${typeQuery}:\n`;
        }

        try {
            const res = await pool.query(query, args.length > 1 ? [args[1]] : []);
            res.rows.forEach((row, index) => {
                leaderboardMessage += `${index + 1}. ${row.username} - ${row.count}\n`;
            });
            message.channel.send(leaderboardMessage);
        } catch (err) {
            console.error('Erreur lors de la récupération du classement', err);
            message.channel.send("Une erreur s'est produite lors de la récupération du classement.");
        }
    }


    
});

client.login(process.env.DISCORD_TOKEN);
