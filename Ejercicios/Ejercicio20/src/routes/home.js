const Router = require('koa-router');
const handlebars = require("koa-handlebars")

let router = new Router();

const script = process.env.ENVIRON === "heroku" ? '/scripts/mainHeroku.js' : '/scripts/main.js'

const test = () => {
  return 'index'
}

router.get('/', async ctx => {
  await ctx.render('main', { partial: test() })
});

module.exports = router;