/* Controller for polar chart type */

/* Helper function that parses data from string to float */
const dataParsing = require('./dataParsing');

/* Controller function */
exports.transform = async (req, res) => {
    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (polar - ${call_id}): Controller called`);

    /* The following code is to transform the request body to the format that highcharts polar chart expects */
    try {
        var number_of_lines = Object.keys(req.body).length - 2;
        let highchartsPolar = {
            chart: {
                polar: true
            },

            title: {
                text: req.body.ChartTitle[0]
            },

            subtitle: {
                text: req.body.ChartSubtitle[0],
            },
            pane: {
                startAngle: 0,
                endAngle: 360
            },
            xAxis: {
                tickInterval: 45,
                min: 0,
                max: 360,
                labels: {
                    format: '{value}°'
                }
            },

            yAxis: {
                min: 0
            },

            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },
            series: [],
        }

        /* Hard to understand but it works */
        var keys = Object.keys(req.body);
        for (let i = 0; i < number_of_lines / 3; i++) {
            highchartsPolar.series[i] = { type: "", name: "", data: [] };
            highchartsPolar.series[i].type = req.body[keys[3 * i + 2]][0];
            highchartsPolar.series[i].name = req.body[keys[3 * i + 3]][0];
            let data = [];
            data = await dataParsing(req.body[keys[3 * i + 4]]);
            highchartsPolar.series[i].data = data;
        }

        res.status(200).json(highchartsPolar);
        console.log(`transformToHighcharts (polar - ${call_id}): Opearion successful`);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (polar - ${call_id}): Opearion unsuccessful`);
        console.log(error);
    }
}