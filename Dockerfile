# Étape 1 — Build
FROM node:22.16 AS build-stage

WORKDIR /app

# Copier les fichiers de dépendances et le schéma Prisma
COPY package.json ./
COPY prisma ./prisma

# Installer TOUTES les dépendances (y compris celles de dev comme Prisma CLI)
RUN npm install

# Générer le client Prisma (nécessite prisma CLI et schema.prisma)
RUN npx prisma generate

# Copier le reste du projet
COPY . .

EXPOSE 3001

CMD npx prisma migrate deploy && node server.js
