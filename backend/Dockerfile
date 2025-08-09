FROM node:18

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma
COPY . .

RUN echo "DATABASE_URL=${DATABASE_URL}" > prisma/.env && \
    npx prisma db push && \
    npx prisma generate && \
    rm prisma/.env

EXPOSE 5000

CMD ["node", "src/server.js"]