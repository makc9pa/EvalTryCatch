// функция возвращает массив типов введенных данных
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

// принимаем все div'ы с классом div.dialog__response-block и создаем из них массив
// для каждого элемента полученного массива ставим значение none для свойства display
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

// функция показа блока с соответствующим сообщением для получаемого класса blockSelector
	showResponseBlock = (blockSelector, msgText, spanSelector) => {

		// вызов функции скрытия значений свойства display
		hideAllResponseBlocks();

		// принимаем div с определенным классом, ставим значение block для свойства display
		document.querySelector(blockSelector).style.display = 'block';

		// если span id задан, то выводим текст msgText
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

// функция показа ошибки, если введенные данные не соответствуют выбранному типу данных
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

// функция показа результата успешного сравнения введенных данных с типом данных
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

// функция показа результата при отсутствии введенных данных
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

// функция сравнения типов введенных данных в поле "Данные" с указанным типом данных
	tryFilterByType = (type, values) => {
		try {
			
			// формирование массива введенных данных через разделитель ","
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

			const alertMsg = (valuesArray.length) ?            // если массив определенного типа существует
				`Данные с типом ${type}: ${valuesArray}` : 	   // то сообщение
				`Отсутствуют данные типа ${type}`; 			   // иначе данные указанного типа отсутствуют
			// вывод сообщения через вызов функции showResults с текстом определенным как аргумент
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);  // обработка ошибки в случае ввода данных типа, не соотвутствующего выбранному
		}
	};

// возвращает первый элемент с id filter-btn (кнопка)
const filterButton = document.querySelector('#filter-btn');

// вешаем обработчик событий на нажатие на кнопку filterButton
filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');    // возвращает первый выбранный элемент с id type (тип данных)
	const dataInput = document.querySelector('#data');    // возвращает первый элемент с id data (поле для ввода данных)

// если данные не введены в поле для ввода данных, то выполняем вызываем 
// метод setCustomValidity для показа сообщения об ошибке
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();    // вызов функции для случая отсутствия введенных данных
	} else {
		dataInput.setCustomValidity('');    // пустое сообщение в методе setCustomValidity для очистки состояния ошибки
		e.preventDefault();

		// вызов функции сравнения выбранного тип данных с введенными данными
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});
