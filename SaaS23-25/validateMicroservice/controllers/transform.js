/* Controller that takes a csv file and transfrom it in a json Format, easy for later process
The Transformation Process is as following:
CSV Format:
 name,email,job
 john,john@gmail.com,doctor
 ,,engineer

 This csv will be transformed to json format:
  {
  "name": [
    "john"
  ],
  "email": [
    "john@gmail.com"
  ],
  "job": [
    "doctor",
    "engineer"
  ]
}
*/

const fs = require('fs');
const csv = require('csv-parser');
const { Readable } = require('stream');

exports.transform = async (req, res) => {
    try {
        const results = {};
        const fileData = req.body.buffer.data; // Assuming the file data is stored in req.body.buffer.data
        const bufferData = Buffer.from(fileData);
        const readableStream = new Readable({
            read() {
                this.push(bufferData);
                this.push(null);
            }
        });

        readableStream
            .pipe(csv({
                separator: ';',
                trim: true
            }))
            .on('data', (data) => {
                Object.entries(data).forEach(([key, value]) => {
                    // Without this trim,somethime in the name of the first key was displayd an unkown (non-printed) character
                    const trimmedKey = key.trim(); // Trim leading/trailing whitespace
                    if (!results[trimmedKey]) {
                        results[trimmedKey] = [];
                    }
                    /*
                    This check supported the multivalues format with spaces between the values
                    It was aborted because some filed can natively have spaces in the value, e.g a title 
                    
                    if (value.includes(' ')) {
                        const multipleValues = value.split(' ');
                        results[trimmedKey].push(...multipleValues);
                    
                    }
                    */

                    /* This check prevents null values to be inserted into json 
                    because of the way that support the multivalue format */
                    if (value != "") {
                        results[trimmedKey].push(value);
                    }
                });
            })
            .on('end', () => {
                const jsonData = JSON.stringify(results, null, 2);
                res.status(200).json(jsonData);
                console.log(jsonData);
            });


    }
    catch (err) {
        console.error('Failed to transform CSV file:', err);
        res.status(500).send('Failed to transform CSV file');
    }
}