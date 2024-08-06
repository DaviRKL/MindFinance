# Utilizar uma imagem base do Node.js
FROM node:18

# Configurar o diretório de trabalho
WORKDIR /app

# Definir a variável de ambiente
ENV NODE_ENV=development

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código-fonte
COPY . .

# Mudar proprietário para o usuário app
RUN chown -R node:node /app

# Definir o usuário para as próximas etapas
USER node

# Construir o projeto
RUN npm run build

# Expor a porta que o Next.js vai utilizar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
