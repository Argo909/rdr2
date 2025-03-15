document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submit');
    const inputForm = document.querySelector('.input-form');
    const receipt = document.querySelector('.receipt');

    submitButton.addEventListener('click', function() {
        const nameInput = document.getElementById('name').value.trim();
        const numberInput = document.getElementById('number').value.trim();
        const priceInput = document.getElementById('price').value.trim();

        if (!nameInput || !numberInput || !priceInput) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        if (!/^\d+$/.test(numberInput)) {
            alert('Номер телефона должен содержать только цифры!');
            return;
        }

        if (isNaN(priceInput) || Number(priceInput) <= 0) {
            alert('Введите корректную сумму!');
            return;
        }

        const fullPhone = '996' + numberInput;
        const recipientNameElement = document.getElementById('recipient-name');
        if (recipientNameElement) {
            recipientNameElement.innerHTML = `<strong>Имя получателя:</strong> ${nameInput}`;
        }

        const transferInfoElement = document.querySelector('.transfer-info');
        if (transferInfoElement) {
            const formattedPrice = Number(priceInput).toFixed(2);
            transferInfoElement.innerHTML = `Перевод по номеру телефона: ${fullPhone} /<br />${nameInput} / Сумма ${formattedPrice} KGS`;
        }

        const amountElement = document.querySelector('.amount');
        if (amountElement) {
            const formattedPrice = Number(priceInput).toFixed(2);
            amountElement.textContent = `-${formattedPrice} С`;
        }

        // Обновляем дату операции
        const transactionDateElement = document.getElementById('transaction-date');
        if (transactionDateElement) {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;
            transactionDateElement.innerHTML = `<strong>Дата операции:</strong> ${formattedDate}`;
        }

        inputForm.style.display = 'none';
        receipt.style.display = 'block';

        // Создаём кнопку "Скачать чек", если её ещё нет
        if (!document.getElementById('download-receipt')) {
            const downloadButton = document.createElement('button');
            downloadButton.id = 'download-receipt';
            downloadButton.textContent = 'Скачать чек';
            downloadButton.style.marginTop = '20px';
            downloadButton.style.display = 'block';
            downloadButton.style.marginLeft = 'auto';
            downloadButton.style.marginRight = 'auto';
            downloadButton.style.padding = '10px 20px';
            downloadButton.style.fontSize = '16px';
            downloadButton.style.backgroundColor = '#4CAF50';
            downloadButton.style.color = 'white';
            downloadButton.style.border = 'none';
            downloadButton.style.borderRadius = '5px';
            downloadButton.style.cursor = 'pointer';

            // Добавляем кнопку внутрь блока чека
            receipt.appendChild(downloadButton);

            // Обработчик для кнопки "Скачать чек"
            downloadButton.addEventListener('click', function() {
                html2canvas(receipt).then(function(canvas) {
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png'); // Преобразуем чек в изображение PNG
                    link.download = 'receipt.png'; // Имя файла
                    link.click();
                });
            });
        }
    });
});