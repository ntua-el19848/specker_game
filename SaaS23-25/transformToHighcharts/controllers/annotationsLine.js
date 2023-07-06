/* Annotations Line Chart Controller */

exports.transform = async (req, res) => {

    /* Random call_id to track the request in the log message */
    const call_id = Math.floor(Math.random() * 65536) + 1;
    console.log(`transformToHighcharts (annotationsLine - ${call_id}): Controller called`);

    try {
        /* The following code is to transform the request body to the format that highcharts annotations line chart expects */

        let mylabels = [];

        for (let i = 0; i < Object.keys(req.body.LabelTitle).length; i++) {
            mylabels[i] = {
                point: {
                    xAxis: 0,
                    yAxis: 0,
                    x: req.body.LabelX[i],
                    y: req.body.LabelY[i],
                },
                text: req.body.LabelTitle[i],
            };
        }
        /* add the data to the series */
        let data = [[]];
        for (let i = 0; i < Object.keys(req.body.xAxisData).length; i++) {
            data[i] = [parseFloat(req.body.xAxisData[i]), parseFloat(req.body.yAxisData[i])];
        }

        let highchartsAnnotationsLine = {
            chart: {
                type: 'area',
                zoomType: 'x',
                panning: true,
                panKey: 'shift',
                scrollablePlotArea: {
                    minWidth: 600
                }
            },

            caption: {
                text: req.body.ChartCaption[0],
            },
            title: {
                text: req.body.ChartTitle[0],
                align: 'left'
            },
            credits: {
                enabled: false
            },

            annotations: [{
                draggable: '',
                labels: []
            },

            ],

            xAxis: {
                labels: {
                    format: '{value} ' + req.body.xAxisUnit[0] + ''
                },
                minRange: 5,
                title: {
                    text: req.body.xAxisTitle[0]
                },
            },

            yAxis: {
                startOnTick: true,
                endOnTick: false,
                maxPadding: 0.35,
                title: {
                    text: req.body.yAxisTitle[0]
                },
                labels: {
                    format: '{value} ' + req.body.yAxisUnit[0] + ''
                },
            },

            tooltip: {
                headerFormat: '' + req.body.xAxisTitle[0] + ': {point.x:.1f} ' + req.body.xAxisUnit[0] + '<br>',
                pointFormat: '' + req.body.yAxisTitle[0] + ': {point.y} ' + req.body.yAxisUnit[0] + '',
                shared: true
            },

            legend: {
                enabled: false
            },

            series: [{
                data: [],
                fillOpacity: 0.5,
                marker: {
                    enabled: false
                },
                threshold: null
            }]

        }

        /* add the data to the series */
        highchartsAnnotationsLine.series[0].data = data;
        highchartsAnnotationsLine.annotations[0].labels = mylabels;

        res.status(200).json(highchartsAnnotationsLine);
        console.log(`transformToHighcharts (annotationsLine - ${call_id}): Operation successful`);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(`transformToHighcharts (annotationsLine - ${call_id}): Operation unsuccessful`);
        console.log(error);
    }
}