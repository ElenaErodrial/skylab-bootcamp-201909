const fs = require('fs')
const path = require('path')

fs.readdir(process.argv[2], (err, list)=>{
     if (err) throw err;
     list.forEach(element=> {
         if (path.extname(element).slice(1) === 'md')
         console.log(element)}
);})


/*
fs.readFile(process.argv[2], 'utf8', (err, data) => {
if (err) throw err; 
let array = data.split('\n')
console.log(array.length -1)
})*/