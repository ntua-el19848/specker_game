/* This file contains the code for the initializeUser function.*/

/* The dependencies we need */
var mongoose = require('mongoose');
var userQuotas = require('../models/userQuotas.js');

/* Import sendFailResponse function */
const { sendFailResponse } = require("./response");

/* Import assert function */
const assert = require('assert').strict;

/* Function that implentes the insertion of a new user */
exports.initializeUser = async (req, res) => {
	/* Get the arguments that are passed in the request body */
	const usermail = req.body.userEmail;
	const defaultbalance = req.body.defaultBalance;

	/* Check if the arguments are valid */
	if (usermail === undefined || defaultbalance == undefined) {
		console.log("initializeUser: no userEmail or defaultBalance specified");
		sendFailResponse(res, "no userEmail or defaultBalance specified");
	}
	/* Check if the arguments are of the accepted values */
	else if (defaultbalance < 0) {
		console.log("initializeUser: cannot initialize user with negative balance");
		sendFailResponse(res, "cannot initialize user with negative balance");
	}
	/* Check if the arguments are of the accepted types */
	else {
		/* Validate email using regular expression */
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!emailRegex.test(usermail)) {
			console.log("initializeUser: regex validation failed");
			sendFailResponse(res, "email regex validation failed");
		} else {
			/* Check if the user already exists */
			try {
				/* Find the user with the given email and update */
				await userQuotas.findOneAndUpdate(
					{ userEmail: usermail },
					{
						$set: {
							userEmail: usermail,
							totalQuotas: defaultbalance
						}
					}, { upsert: true }
				);
				console.log("initializeUser: created successfullly new user with mail:", usermail, "and balance:", defaultbalance);
				res.status(200).send();
			}
			/* If something goes wrong */
			catch (err) {
				console.log("initializeUser:", err);
				sendFailResponse(res, err);
			}
		}
	}
};