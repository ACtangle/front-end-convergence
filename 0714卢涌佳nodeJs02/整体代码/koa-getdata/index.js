
const Koa = require('koa');
const Router = require('koa-router');

const elementDataList = require('./data/data.json');


const app = new Koa();
const router = new Router();


router.get('/getData',(ctx) => {
    ctx.body = elementDataList.find((item) => item.name = "koa");
})

app.use(router.routes());

app.listen(8080);