/* Helper function that parses data from string to float */
async function dataParsing(data){
    let response=[];
    for(let i=0; i<data.length; i++){
        response[i]=parseFloat(data[i]);
    }
    return response;
}

module.exports = dataParsing;