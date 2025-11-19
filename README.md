# Программа для обработки DOCX файлов

Программа для замены тегов в документах Word (docx) с использованием библиотеки docxtemplater.

## Установка

Установите зависимости:

```bash
npm install
```

## Использование

### Базовый пример

1. Создайте файл `example.docx` в Word со следующим содержимым:

```
Здравствуйте, {{FIRST_NAME}} {{LAST_NAME}}!

Ваши контактные данные:
- Email: {{EMAIL}}
- Телефон: {{PHONE}}
- Должность: {{POSITION}}
```

2. Запустите программу:

```bash
npm start
```

или

```bash
node process-docx.js
```

3. Результат будет сохранён в файле `output.docx`

## Синтаксис тегов

### Простая замена

```
{{VARIABLE_NAME}}
```

### Циклы (списки)

В коде:
```javascript
const data = {
  COMPANY: 'Acme Corp',
  EMPLOYEES: [
    { name: 'Алексей', role: 'Backend' },
    { name: 'Мария', role: 'Frontend' },
    { name: 'Дмитрий', role: 'DevOps' }
  ]
};
```

В шаблоне Word:
```
Компания: {{COMPANY}}

Сотрудники:
{#EMPLOYEES}
- {{name}} - {{role}}
{/EMPLOYEES}
```

### Условия

В шаблоне:
```
{#hasDiscount}
Скидка применена!
{/hasDiscount}
```

## Настройка данных

Отредактируйте объект `userData` в файле `process-docx.js`:

```javascript
const userData = {
  FIRST_NAME: 'Иван',
  LAST_NAME: 'Петров',
  EMAIL: 'ivan.petrov@example.com',
  PHONE: '+7 (999) 123-45-67',
  POSITION: 'Full-stack разработчик'
};
```

## Дополнительные возможности

- ✅ Замена простых переменных
- ✅ Циклы для списков данных
- ✅ Условные блоки
- ✅ Сохранение форматирования текста
- ✅ Поддержка переносов строк

## Структура проекта

```
mimdokk/
├── node_modules/
├── package.json
├── process-docx.js      # Основной файл программы
├── docx        # Шаблон документа (создайте вручную)
└── output.docx          # Результат обработки
```

## Требования

- Node.js 12 или выше
- npm

## Зависимости

- `docxtemplater` - библиотека для работы с docx шаблонами
- `pizzip` - для работы с zip-архивами (docx это zip-архив)
