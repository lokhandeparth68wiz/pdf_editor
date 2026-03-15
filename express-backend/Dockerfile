FROM node:18-bullseye

# Install Ghostscript and LibreOffice
RUN apt-get update && apt-get install -y \
    ghostscript \
    libreoffice \
    libreoffice-writer \
    libreoffice-java-common \
    default-jre \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
