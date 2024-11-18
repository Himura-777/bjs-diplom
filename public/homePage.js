const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManger = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из личного кабинета
logoutButton.action(() => {
	if (response.success === true) {
		location.reload();
	} else {
		setMessage(`Ошибка выхода: ${response.error}`);
	}
});

// Получение информации о пользователе
ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		setMessage(`Ошибка получения: ${response.error}`);
	}
});

// Получение текущих курсов валюты
function getCurrentRates() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable();
		} else {
			setMessage(`Ошибка получения: ${response.error}`);
		}
	});
}
getCurrentRates();
setInterval(getCurrentRates, 60000);

// Операции с деньгами
moneyManger.addMoneyCallback = function () {
	moneyManger.addMoneyAction();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Пополнение прошло успешно.');
	} else {
		setMessage(`Ошибка пополнения: ${response.error}`);
	}
};

moneyManger.conversionMoneyCallback = function () {
	moneyManger.convertMoney();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Конвертирование прошло успешно.');
	} else {
		setMessage(`Ошибка конвертирования: ${response.error}`);
	}
};

moneyManger.sendMoneyCallback = function () {
	moneyManger.transferMoney();
	if (response.success === true) {
		showProfile(response.data);
		setMessage('Перевод прошёл успешно.');
	} else {
		setMessage(`Ошибка перевода: ${response.error}`);
	}
};

// Работа с избранным
favoritesWidget.getFavorites(() => {
	if (response.success === true) {
		clearTable();
		fillTable(response.data);
		updateUsersList();
	} else {
		setMessage(`Ошибка запроса: ${response.error}`);
	}
});

favoritesWidget.addUserCallback = function () {
	favoritesWidget.addUserToFavorites();
	if (response.success === true) {
		clearTable();
		fillTable(response.data);
		updateUsersList();
		setMessage('Добавление прошло успешно.');
	} else {
		setMessage(`Ошибка добавления: ${response.error}`);
	}
};

favoritesWidget.removeUserCallback = function () {
	favoritesWidget.removeUserFromFavorites();
	if (response.success === true) {
		clearTable();
		fillTable(response.data);
		updateUsersList();
		setMessage('Удаление прошло успешно.');
	} else {
		setMessage(`Ошибка удаления: ${response.error}`);
	}
};
