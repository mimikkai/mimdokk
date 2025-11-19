const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');

// Функция для обработки docx файла
function processDocx(inputFile, outputFile, data) {
    try {
        // Читаем файл шаблона как бинарные данные
        const content = fs.readFileSync(
            path.resolve(__dirname, inputFile),
            'binary'
        );

        // Разархивируем содержимое (docx это zip-архив)
        const zip = new PizZip(content);

        // Создаем экземпляр docxtemplater
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: { start: '{{', end: '}}' }
        });

        // Заменяем теги на значения из объекта data
        doc.render(data);

        // Генерируем новый docx файл
        const buffer = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE'
        });

        // Сохраняем результат
        fs.writeFileSync(path.resolve(__dirname, outputFile), buffer);

        console.log(`✅ Файл успешно обработан: ${outputFile}`);
    } catch (error) {
        console.error('❌ Ошибка при обработке файла:', error);
    }
}

// Данные для замены тегов
const userData = {
    FIRST_NAME: 'Иван',
    LAST_NAME: 'Петров',
    EMAIL: 'ivan.petrov@example.com',
    PHONE: '+7 (999) 123-45-67',
    POSITION: 'Full-stack разработчик'
};

// Запускаем обработку
processDocx('examples/contact-info/example.docx', 'output.docx', userData);
