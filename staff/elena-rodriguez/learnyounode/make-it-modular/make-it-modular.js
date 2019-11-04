const filtered = require('./mymodule')
const { argv: [,,folder,ext]} = process

filtered(folder, ext, (error, data)=>{
    if (error) throw error
    data.forEach(element=>console.log(element)) 
    
})