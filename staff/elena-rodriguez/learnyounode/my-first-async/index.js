const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', (err, data) => {
if (err) throw err; 
let array = data.split('\n')
console.log(array.length -1)
})




/*let array = result.split('\n')

console.log(array.length -1)*/