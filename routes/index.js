import Router from 'koa-router'
import * as controllers from '../controllers'

const router = new Router()

router.post('/login', controllers.login)
router.get('/bookInfo', controllers.bookInfo)
router.post('/bookInfo', controllers.create)
router.delete('/bookInfo/:id', controllers.del)
router.put('/bookInfo/:id', controllers.update)

export default router
