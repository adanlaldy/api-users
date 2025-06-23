# Base image
FROM node:22.16

# Créer un dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

RUN npm rebuild bcrypt --build-from-source

# Copier le reste de l'application
COPY . .

# Exposer le port utilisé par Express
EXPOSE 3001

# Commande pour démarrer le serveur
CMD ["node", "server.js"]
