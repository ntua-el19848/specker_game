/* imports */
var mongoose = require('mongoose');
var userQuotas = require('../models/userQuotas.js');
const { sendFailResponse } = require("./response.js");

/* Function that implentes the retrieve of a user's credits */
exports.remainingQuotas = async (req, res) => {
	/* Get the arguments that are passed in the request params */
	const usermail = req.params.email;

	/* Check if the arguments are valid */
	if (usermail === undefined) {
		console.log("updateQuotas: no userEmail specified");
		sendFailResponse(res, "no userEmail specified");
	}
	else {
		/* Check if the arguments are of the accepted types */
		const user = await userQuotas.findOne({ userEmail: usermail });
		if (!user) {
			console.log("updateQuotas: no such user exists");
			sendFailResponse(res, "no such user exists");
		}
		else {
			/* Return the user's totalQuotas */
			res.status(200).json({
				status: "success",
				userEmail: usermail,
				totalQuotas: user.totalQuotas
			});
		}
	}
};