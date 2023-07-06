/* Controller for basicColumn chart type */

/* Helping function to parse the data to float */
const dataParsing = require('./dataParsing');

/* Controller function */
exports.transform = async (req, res) => {
    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (basicColumn - ${call_id}): Controller called`);

    /* The following code is to transform the request body to the format that highcharts basic column chart expects */
    try {
        var number_of_lines = Object.keys(req.body).length - 4;

        let highchartsBasicColumn = {
            chart: {
                type: 'column'
            },
            title: {
                text: req.body.ChartTitle[0],
            },
            subtitle: {
                text: req.body.ChartSubtitle[0],
            },
            xAxis: {
                categories: req.body.Categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: req.body.yAxisTitle[0],
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: []
        }

        /* add the data to the series */
        var keys = Object.keys(req.body);
        for (let i = 0; i < number_of_lines / 2; i++) {
            /* add the data to the series, hard to understand but it works */
            highchartsBasicColumn.series[i] = { name: "", data: [] };
            highchartsBasicColumn.series[i].name = req.body[keys[2 * i + 4]][0];
            let data = [];
            data = await dataParsing(req.body[keys[2 * i + 5]]);
            highchartsBasicColumn.series[i].data = data;
        }

        res.status(200).json(highchartsBasicColumn);
        console.log(`transformToHighcharts (basicColumn - ${call_id}): Operation successful`);

    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (basicColumn - ${call_id}): Operation unsuccessful`);
        console.log(error)
    }
}