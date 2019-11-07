const Feedback = require('../feedback')

module.exports = function ({path}) {
    return `<section class="view login">
    <form method="POST" action="/login">
        <h1 class="login__title">Login</h1>
        <input class="login__field" type="email" name="email" placeholder="e-mail" />
        <input class="login__field" type="password" name="password" placeholder="password" />
        <button class="login__submit">📨</button>
        <a class="login__back" href="${path}">Go back</a>
    </form>
    ${Feedback()}
</section>`}