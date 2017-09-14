import auth from '../controllers/user.js'
import koaRouter from 'koa-router'

const router=koaRouter()

router.get('/user/:id',auth.getUserInfo)
router.post('/register',auth.registerAccount)

export default router