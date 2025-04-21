const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из личного кабинета
logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.success === true) {
			location.reload();
		}
	});
};

// Получение информации о пользователе
ApiConnector.current(response => {
	if (response.success === true) {
		ProfileWidget.showProfile(response.data);
	}
});

// Получение текущих курсов валюты
function getCurrentRates() {
	ApiConnector.getStocks(response => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		} else {
			moneyManger.setMessage(response.success, "Something wrong");
		}
	});
}
getCurrentRates();
let updateBoard = setInterval(getCurrentRates, 60000);

// Операции с деньгами
moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success === true) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Счёт успешно пополнен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success === true) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(
				response.success,
				"Валюта успешно конвертирована"
			);
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success === true) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Перевод выполнен успешно");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

// Работа с избранным
const getFavorites = () => {
	ApiConnector.getFavorites(response => {
		if (response.success === true) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		} else {
			setMessage(`Ошибка запроса: ${response.error}`);
		}
	});
};
getFavorites();

favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		if (response.success) {
			moneyManager.setMessage(
				response.success,
				"Пользователь добавлен в список Избранное"
			);
			getFavorites();
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		if (response.success) {
			moneyManager.setMessage(
				response.success,
				"Пользователь удален из списка Избранное"
			);
			getFavorites();
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};
