import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes/index'
import cors from 'koa2-cors'

import { sequelize, testDBConnection } from './models'

const app = new koa()

app
  .use(cors({
    origin: '*'
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  

app.listen(8080, () => {
  testDBConnection(sequelize)
})