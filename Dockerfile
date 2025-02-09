# Используем Node.js 18 на Alpine Linux
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json отдельно (для кеширования зависимостей)
COPY package.json package-lock.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies)
RUN npm install

# Копируем остальной код (исключая node_modules через .dockerignore)
COPY . .

# Указываем переменные окружения
ENV NODE_ENV=production

# Собираем приложение
RUN npm run build

# Удаляем dev-зависимости после сборки, чтобы контейнер был легче
RUN npm prune --omit=dev

# Запускаем приложение
CMD ["npm", "run", "start"]