import express, { Request, Response } from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import './controllers/LoginController'
import './controllers/RootController'

import { AppRouter } from './AppRouter'

const controllerRouter = <express.Router>new AppRouter()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['qdoritfdsdgeeesdfls'] }))
app.use(controllerRouter)

app.listen(3000, () => {
  console.log('listening on port 3000')
})
