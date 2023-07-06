/* Controller responsible for transforming the request body to the format that highcharts network chart expects */

exports.transform = async (req, res) => {
    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (network - ${call_id}): Controller called`);

    /* The following code is to transform the request body to the format that highcharts network chart expects */
    try {
        let data = [[]];

        for (let i = 0; i < Object.keys(req.body.NodeRelationA).length; i++) {
            data[i] = [req.body.NodeRelationA[i], req.body.NodeRelationB[i]];
        }

        let highchartsNetwork = {
            chart: {
                type: 'networkgraph',
                height: '100%'
            },
            title: {
                text: req.body.ChartTitle[0],
                align: 'left'
            },
            subtitle: {
                text: req.body.ChartSubtitle[0],
                align: 'left'
            },
            plotOptions: {
                networkgraph: {
                    keys: ['from', 'to'],
                    layoutAlgorithm: {
                        enableSimulation: true,
                        friction: -0.9
                    }
                }
            },
            series: [{
                accessibility: {
                    enabled: false
                },
                dataLabels: {
                    enabled: true,
                    linkFormat: '',
                    style: {
                        fontSize: '0.8em',
                        fontWeight: 'normal'
                    }
                },
                id: 'lang-tree',
                data: [],
            }]
        }

        /* add the data to the series */
        highchartsNetwork.series[0].data = data;

        res.status(200).json(highchartsNetwork);
        console.log(`transformToHighcharts (network - ${call_id}): Opearion successful`);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (network - ${call_id}): Opearion unsuccessful`);
        console.log(error);
    }
}