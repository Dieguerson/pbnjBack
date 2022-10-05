const Router = require('koa-router');

let router = new Router();

const script = process.env.ENVIRON === "heroku" ? '/scripts/mainHeroku.js' : '/scripts/main.js'

router.get('/', async ctx => {
  await ctx.render('main', { partial: 'index', script: script })
});

module.exports = router;