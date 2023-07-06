//controller that stores a Json string of a chart ready to be input to highcharts

var jsonModel = require('../models/jsonModel.js');

/* Controller that stores a Json string created for a chart ready to be input to highcharts
   Besides the json data with take as parameter the user email and the chart type of diagram */
exports.store = async (req, res) => {
  try {
    const email_param = req.params.email;
    const chart_type = req.params.type;
    const jsonData = req.body;

    if (email_param === undefined) {
      console.log("storeGet (store): no jsonData specified");
      res.status(400).json({
        status: "failed",
        reason: "no jsonData specified",
      });
    }

    const chart = await jsonModel.find({
      emailUser: email_param,
      'title.text': jsonData.title.text,
      })
      .select(
        { _id: 0, __v: 0,emailUser: 0, typeFrontend: 0, creationDate: 0 }
      );
      if (chart == "") {
        // Construct a new object with dynamic keys and values
        // despite the rest Highcharts object, store also the userEmail and the creationDate
        const dynamicData = {};
        dynamicData["emailUser"] = email_param;
        dynamicData["typeFrontend"] = chart_type;
        dynamicData["creationDate"] = new Date().toJSON().slice(0, 10);
        Object.keys(jsonData).forEach((key) => {
          dynamicData[key] = jsonData[key];
        });

        await jsonModel.create(dynamicData);
        console.log('JSON data stored successfully');

        res.sendStatus(200);
      }
      else{
        res.status(204).json({
          status: 204,
          reason: "chart already exists",
        });
      }
  }
  catch (error) {
    console.error('Error storing JSON data:', error);
    res.sendStatus(500);
  }
};
