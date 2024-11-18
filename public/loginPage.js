'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
	ApiConnector.login(data, function (response) {
		console.log('Ответ сервера:', response);

		if (response.success === true) {
			location.reload();
		} else {
			user.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
		}
	});
};

userForm.registerFormCallback = function (data) {
	ApiConnector.register(data, function (response) {
		console.log('Ответ сервера:', response);

		if (response.success === true) {
			location.reload();
		} else {
			user.setRegisterErrorMessage(`Произошла ошибка: ${response.error}`);
		}
	});
};
