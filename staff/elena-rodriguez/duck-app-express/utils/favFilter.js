module.exports = function (ducks){
    results = []
    ducks.forEach(duck => {
        duck.isFav && results.push(duck)  
    })
    return results
}