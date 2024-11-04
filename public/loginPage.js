'use strict';

const user = new useForm();

user.loginFormCallback = function (data) {
	ApiConnector.login(data, function (response) {
		console.log('Ответ сервера:', response);

		if (response.success === true) {
			location.reload();
		} else {
			useFormObject.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
		}
	});
};

user.registerFormCallback = function (data) {
	ApiConnector.register(data, function (response) {
		console.log('Ответ сервера:', response);

		if (response.success === true) {
			location.reload();
		} else {
			useFormObject.setRegisterErrorMessage(
				`Произошла ошибка: ${response.error}`
			);
		}
	});
};
