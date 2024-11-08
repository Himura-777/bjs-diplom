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
