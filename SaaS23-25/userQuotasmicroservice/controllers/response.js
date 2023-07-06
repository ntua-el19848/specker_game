/* source file containing an error function called by every controller */
exports.sendFailResponse = (res, reason) => {
	res.status(400).json({
	  status: "failed",
	  reason: reason,
	});
};
  