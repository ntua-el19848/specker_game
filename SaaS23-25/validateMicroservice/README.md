## Microservice
# validateMS

This microservice has the responsibility of transforming csv data to Json format.
In frontend Validate microservice is called ,when a user uploads a CSV file, 
to transform it in a format that another microservice (e.g. transformMicroservice)
can takes it and create a json format ready for Highcharts. 
It's called validate microservice because can catch some edge cases in which CSV file is in a really bad format.
If this microservice cannot detect the error in CSV data, then the transform Microservice will certainly detect it.
Implemented in NodeJS and Express.
