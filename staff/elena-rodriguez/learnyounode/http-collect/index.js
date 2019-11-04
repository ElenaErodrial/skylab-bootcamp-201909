const http = require('http')

http.get(process.argv[2] , (response) => {
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