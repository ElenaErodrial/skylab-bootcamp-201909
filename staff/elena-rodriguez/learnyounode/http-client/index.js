
const http = require('http')

const result = http.get(process.argv[2], (response) => {
    response.setEncoding('utf8')
    response.on('error' , error =>{ throw error} )
    response.on('data', (data) => {
        console.log(data)
    })
})

result.on('error' , error => {throw error} )