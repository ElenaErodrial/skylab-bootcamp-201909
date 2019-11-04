const fs = require('fs')

let result = (fs.readFileSync(process.argv[2]).toString());

let array = result.split('\n')

console.log(array.length -1)

