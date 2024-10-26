# Etapa de construção (builder)
FROM node:18-alpine as builder

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de configuração de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código do projeto
COPY . .

# Construir o projeto
RUN npm run build

# Etapa de execução (runner) para rodar o servidor em produção
FROM node:18-alpine as runner

# Diretório de trabalho para o container final
WORKDIR /app

# Copiar somente os arquivos necessários para execução em produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalar dependências de produção
RUN npm install --only=production

# Expor a porta que o servidor usa (ajuste se necessário)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
