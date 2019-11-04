const fs = require('fs')
const path = require('path')

module.exports = (folder, ext, callback)=>{
    fs.readdir(folder, 'utf8', (err, list)=>{
     if (err) return callback(err);

    const result = list.filter(element=> path.extname(element).slice(1) === ext)
    callback(undefined, result)
})
}