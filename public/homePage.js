const { response } = require('express');

// Выход из личного кабинета
const logOut = new LogoutButton();
logOut.action(() => {
	if (response.success === true) {
		location.reload();
	}
});

// Получение информации о пользователе
function getCurrentUser() {
	ApiConnector.current(response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
		}
	});
}

// Получение текущих курсов валюты
function getCurrentRates() {
	const rates = new RatesBoard();
	ApiConnector.getStocks(response => {
		if (response.success) {
			rates.clearTable();
			rates.fillTable();
		}
	});
}
getCurrentRates();
setInterval(getCurrentRates, 60000);

// Операции с деньгами
const moneyManger = new MoneyManager();
moneyManger.addMoneyCallback = function () {
	addMoneyAction();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Пополнение прошло успешно.');
	} else {
		setMessage(`Ошибка пополнения: ${response.error}`);
	}
};

moneyManger.conversionMoneyCallback = function () {
	convertMoney();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Конвертирование прошло успешно.');
	} else {
		setMessage(`Ошибка конвертирования: ${response.error}`);
	}
};

moneyManger.sendMoneyCallback = function () {
	transferMoney();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Перевод прошёл успешно.');
	} else {
		setMessage(`Ошибка перевода: ${response.error}`);
	}
};
