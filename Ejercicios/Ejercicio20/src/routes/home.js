const Router = require('koa-router');
const handlebars = require("koa-handlebars")

let router = new Router();

const script = process.env.ENVIRON === "heroku" ? '/scripts/mainHeroku.js' : '/scripts/main.js'

router.use(handlebars({
  defaultLayout: "main"
}));

router.get('/', function *() {
  console.log('AQUI')
  yield this.render('index', {script})
});

module.exports = router;