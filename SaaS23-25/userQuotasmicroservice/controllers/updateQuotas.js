/* imports */
var mongoose = require('mongoose');
var userQuotas = require('../models/userQuotas.js');
const { sendFailResponse } = require("./response.js");

/* Function that implentes the updating of a user's credits. In case of purchase of credits or buying chart */
exports.updateQuotas = async (req, res) => {
	/* Get the arguments that are passed in the request body */
	const usermail = req.body.userEmail;
	const quotas = req.body.quotas;

	/* check for correct HTTP body arguments */
	if (usermail === undefined || quotas === undefined) {
		console.log("updateQuotas: no userEmail or quotas specified");
		sendFailResponse(res, "no userEmail or quotas specified");
	}
	/* check for correct HTTP body argument types */
	else if (quotas == 0) {
		console.log("updateQuotas: cannot update quotas with 0 amount");
		sendFailResponse(res, "cannot update quotas with 0 amount");
	}
	/* try to update the quota value of the specified email */
	else {
		/* Validate email using regular expression */
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!emailRegex.test(usermail)) {
			console.log("updateQuotas: regex validation failed");
			sendFailResponse(res, "email regex validation failed");
		} else {
			/* Check if the user exists in db */
			const user = await userQuotas.findOne({ userEmail: usermail });
			/* If user does not exist */
			if (!user) {
				console.log("updateQuotas: user not found with email", usermail);
				sendFailResponse(res, "user not found");
				return;
			}
			/* If user exists */
			else {
				try {
					/* Check if the user has enough totalQuotas to substract the specified amount */
					if (user.totalQuotas + quotas < 0) {
						res.status(210).json({
							message:"inseffucient totalQuotas to substract the specified amount"
						});
						return;
					}
					/* Find the user with the given email and update */
					else {
						await userQuotas.findOneAndUpdate(
							{ userEmail: usermail },
							{
								$inc: {
									totalQuotas: quotas
								}
							}, { upsert: false }
						);
						console.log("updateQuotas: update successfullly quotas for user:", usermail, "with amount:", quotas);
						res.status(200).send();
					}
				}
				/* If something goes wrong */
				catch (err) {
					console.log("updateQuotas:", err);
					sendFailResponse(res, err);
				}
			}
		}
	}
};