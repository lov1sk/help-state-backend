# Use uma imagem base Debian para maior compatibilidade com pacotes nativos
FROM node:18-alpine AS builder

WORKDIR /app

# Copie o restante do código da aplicação
COPY . .

# Instale as dependências necessárias para compilar pacotes nativos
RUN apk update && \
    apk add wget && \
    apk add --no-cache python3 py3-pip make g++

# Instale as dependências do projeto
RUN npm install


# Exponha a porta do servidor
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["./ini.sh"]
