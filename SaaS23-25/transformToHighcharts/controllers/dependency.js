/* Controller that is responsible for transforming the request body to the format that highcharts dependency wheel expects */

exports.transform = async (req, res) => {
    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (dependency - ${call_id}): Controller called`);

    /* The following code is to transform the request body to the format that highcharts dependency wheel expects */
    try {
        let data = [[]];

        for (let i = 0; i < Object.keys(req.body.From).length; i++) {
            data[i] = [req.body.From[i], req.body.To[i], parseInt(req.body.Weight[i])];
        }

        let highchartsDependency = {
            title: {
                text: req.body.ChartTitle[0],
            },

            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. From {point.from} to {point.to}: {point.weight}.'
                }
            },

            series: [{
                keys: ['from', 'to', 'weight'],
                data: [],
                type: 'dependencywheel',
                name: 'Dependency wheel series',
                dataLabels: {
                    color: '#333',
                    style: {
                        textOutline: 'none'
                    },
                    textPath: {
                        enabled: true
                    },
                    distance: 10
                },
                size: '95%'
            }]
        }

        /* add the data to the series */
        highchartsDependency.series[0].data = data;

        res.status(200).json(highchartsDependency);
        console.log(`transformToHighcharts (dependency - ${call_id}): Operation successful`);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (dependency - ${call_id}): Operation unsuccessful`);
        console.log(error);
    }
}