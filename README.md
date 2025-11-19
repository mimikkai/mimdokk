# Mimdokk - Обработка DOCX шаблонов

CLI утилита для заполнения docx-шаблонов данными через интерактивный интерфейс.

## Установка

```bash
npm install
```

## Использование

### Инспекция и заполнение шаблона

Команда `inspect` сканирует docx-файл на наличие тегов (например `{{TAG_NAME}}`) и запрашивает значения для них в консоли.

```bash
# Запуск через npm
npm start -- inspect path/to/template.docx

# Или напрямую через node (требуется Node.js 25+)
node bin/mimdokk.ts inspect path/to/template.docx
```

### Пример

1. Создайте файл `template.docx` с содержимым:
   ```text
   Привет, {{NAME}}!
   ```

2. Запустите утилиту:
   ```bash
   npm start -- inspect template.docx
   ```

3. Введите значение для `NAME` когда программа попросит.

4. Результат сохранится в `template_filled.docx`.

## Синтаксис шаблонов

Используется синтаксис [docxtemplater](https://docxtemplater.com/):

- `{{VAR}}` — простая замена
- `{#LIST}}...{{/LIST}}` — циклы
- `{#BOOL}}...{{/BOOL}}` — условия

## Структура проекта

```
mimdokk/
├── bin/
│   └── mimdokk.ts       # Точка входа CLI
├── lib/
│   ├── docx.ts          # Логика работы с docx
│   └── ui.ts            # Интерактивный интерфейс
├── examples/            # Примеры шаблонов
└── package.json
```

## Требования

- Node.js 25.2.0 или выше (для нативной поддержки TypeScript)

## Зависимости

- `docxtemplater` - библиотека для работы с docx шаблонами
- `pizzip` - для работы с zip-архивами (docx это zip-архив)
