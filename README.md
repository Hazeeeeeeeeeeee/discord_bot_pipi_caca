# Pipi Caca Bot pour Discord
Le Pipi Caca Bot est un bot Discord amusant et interactif qui permet aux utilisateurs de compter les occurrences de "pipi" et "caca" dans les messages, et de voir des classements des utilisateurs.

# Installation
## Prérequis
Docker et Docker Compose
Node.js
Un token de bot Discord
## Configuration

# Configurez les variables d'environnement :

Créez un fichier .env à la racine du projet et ajoutez votre token de bot Discord :

```Copy code
DISCORD_TOKEN=votre_token_discord
```

# Construire et Démarrer les Services avec Docker Compose :
## À la racine de votre projet, exécutez :

```
cd src
npm i
cd ..
docker-compose up --build
``

Vérification :
Après le démarrage des services, votre bot devrait être en ligne sur votre serveur Discord. Testez les commandes pour vous assurer que tout fonctionne correctement.

Commandes du Bot
!caca : Enregistre une occurrence de "caca".
!pipi : Enregistre une occurrence de "pipi".
!top : Affiche le classement combiné de "pipi" et "caca".
!top pipi ou !top caca : Affiche un classement spécifique pour "pipi" ou "caca".