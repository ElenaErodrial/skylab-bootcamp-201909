const Feedback = require('../feedback')

module.exports = function (error) {
    return `<ul class='results'
${error ? Feedback({ message: error }) : ''}
</ul>`

}