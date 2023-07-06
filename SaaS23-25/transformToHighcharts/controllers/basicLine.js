/* Controller responsible for transforming the request body to the format that highcharts basic line chart expects */

/* Helper function that parses data from string to float */
const dataParsing = require('./dataParsing');

/* Controller function */
exports.transform = async (req, res) => {
    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (basicLine - ${call_id}): Controller called`);

    /* The following code is to transform the request body to the format that highcharts basic line chart expects */
    try {
        var number_of_lines = Object.keys(req.body).length - 4;

        let highchartsLine = {
            title: {
                text: req.body.ChartTitle[0],
                align: 'left'
            },
            yAxis: {
                title: {
                    text: req.body.yAxisTitle[0],
                }
            },

            xAxis: {
                title: {
                    text: req.body.xAxisTitle[0],
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: parseFloat(req.body.xStart[0]),
                }
            },

            series: [],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }

        /* Hard to understand but it works */
        var keys = Object.keys(req.body);
        for (let i = 0; i < number_of_lines / 2; i++) {
            highchartsLine.series[i] = { name: "", data: [] };
            highchartsLine.series[i].name = req.body[keys[2 * i + 4]][0];
            let data = [];
            data = await dataParsing(req.body[keys[2 * i + 5]]);
            highchartsLine.series[i].data = data;
        }

        res.status(200).json(highchartsLine);
        console.log(`transformToHighcharts (basicLine - ${call_id}): Operation successful`);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (basicLine - ${call_id}): Operation unsuccessful`);
        console.log(error);
    }
}