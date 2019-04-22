var constants = require ('./constant');

exports.parameterMissing = (res, result) => {
	let response = {
		"message": result,
		"response" : {}
	};
	res.status(constants.responseFlags.PARAMETER_MISSING).json(response);
};

exports.parameterMissingResponse = (res) => {
	let response = {
		"message": constants.responseMessages.PARAMETER_MISSING,
		"response" : {}
	};
	res.status(constants.responseFlags.PARAMETER_MISSING).json(response);
};

exports.invalidCredential = function (res, msg) {
	var response = {
		"message": msg,
		"response" : {}
	};
	res.status(constants.responseFlags.INVALID_CREDENTIAL).json(response);
	return false;
};

exports.authenticationErrorResponse =  (res) => {
	var response = {
		"message": constants.responseMessages.INVALID_ACCESS_TOKEN,
		"response" : {}
	};
	res.status(constants.responseFlags.INVALID_ACCESS_TOKEN).json(response);
};

exports.sendError = (error, res) => {
	var response = {
		"message": constants.responseMessages.ERROR_IN_EXECUTION,
		"response" : {},
		"error": error
	};
	res.status(constants.responseFlags.ERROR_IN_EXECUTION).json(response);
};

exports.success = (res, result, message = constants.responseMessages.ACTION_COMPLETE) => {
	var response = {
		message,
		"response" : result
	};
	res.status(constants.responseFlags.ACTION_COMPLETE).json(response);
};

exports.userNotExist = (res) => {
	var response = {
		"message": "User not found.",
		"response" : {}
	};
	res.status(constants.responseFlags.ACTION_COMPLETE).json(response);	
}


exports.emailAlreadyExist = (res) => {
	var response = {
		"response" : {},
		"message" : constants.responseMessages.EMAIL_ALREADY_EXISTS
	};
	res.status(constants.responseFlags.ALREADY_EXIST).json(response);
}

exports.varifyotp = (res) => {
	var response = {
		"response" : 0 ,
		"message" : constants.responseMessages.PLEASE_VERIFY_OTP
	};
	res.status(constants.responseFlags.PLEASE_VERIFY_OTP).json(response);
}

exports.INVALID_ACCESS_TOKEN = (res) => {
	var response = {
		"response" : 0,
		"message" : constants.responseMessages.INVALID_ACCESS_TOKEN
	};
	res.status(constants.responseFlags.INVALID_ACCESS_TOKEN).json(response);
}