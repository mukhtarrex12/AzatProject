# Инструкция по запуску

Полный стек:
- Backend: ASP.NET Core (.NET 8), EF Core, PostgreSQL
- Frontend: React 19 + TypeScript, Vite 7 (Node.js >= 20.19)

## Требования
- .NET SDK 8.0+
- Node.js 20.19+ и npm (проверка: `node -v`, `npm -v`)
- PostgreSQL 14+ (локально или доступный сервер)

## 1) Клонирование и установка зависимостей
git clone https://github.com/mukhtarrex12/AzatProject.git

## 2) Переход в директорию проекта и установите зависимости фронтенда
- cd AzatProject
- npm install

## 3) Настройка базы данных
- Создайте базу данных PostgreSQL c названием "AzatProject" и паролем "123" и юзером "postgres" (или измените строку подключения в `appsettings.json`).

## 4) Применение миграций
- В диспетчере пакетов выбертие проект `AzatProject.Server` и выполните команду:
- `Update-Database`

## 5) Запустите проект нажав на кнопку "Запуск" в Visual Studio