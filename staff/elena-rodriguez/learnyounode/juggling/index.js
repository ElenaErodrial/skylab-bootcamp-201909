const http = require('http');
const results = []; // array vacío para guardar el resultado de cada url.
const urls = process.argv.slice(2); // coge todos menos los dos primeros argumentos.
    // otra opción. Deconstructing. const {argv : [, , ...urls]} = process
let counter = urls.length; // coge el length de los arguments (sin los dos primeros que ya le hemos quitado)

const getInfo = (index) => {
    /*esto se va a producir por cada una de las url (async--> si la primera url tiene mucha data, 
    la segunda url se irá ejecutando, por eso nos lo devolverá desordenado, llegará primero posiblemente la que pese menos)*/
    http.get(urls[index], (response) => {
        response.setEncoding('utf8');
        var tempData = ""; // crea un recipiente vacío para los chunks que llegan, donde se almacenarán concatenados. 
        response.on('data', function(chunk) {
            tempData += chunk; // Concatena los segmentos de data (chunks) de un argument (url)                   
        });
        response.on('end', () => {
            //esto solo se ejecuta cuando los chunks de un argument se han recibido por completo.
            results[index] = tempData; // Colocamos el string tempData en la misma posición que el argument.
            counter --; // restamos uno al contador
            if (!counter) { //solo cuando ya todos los arguments estén añadidos a results
                results.forEach(function(data) {
                    console.log(data); //los imprimimos y saldrán en orden. RESULTADO FINAL.
                });
            }
        });
        response.on('error', (err) => { //esto solo en caso de que haya un error
            console.error('There has been an error: ' + err);
        });
    });
};

urls.forEach((url, i) => { /*este es el loop que nos permite iterar por los diferentes
     argumentos y ejecutarle la función getInfo*/
    getInfo(i);
});