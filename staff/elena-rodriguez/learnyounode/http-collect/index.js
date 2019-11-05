const http = require('http')
const { argv : [, , url] } = process
//deconstructing!! lo mismo que hacer process.argv[2]
http.get(url , (response) => {
    response.setEncoding('utf8')
    let myData = '';
    response.on('data', (piece) => {
        myData += piece;
    });
    response.on('end', () => {
try {
    console.log(myData.length)
    console.log(myData)
} catch (e) {console.error(e.message)}
    })
})