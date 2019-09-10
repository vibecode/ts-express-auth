import { Router, Request, Response, NextFunction } from 'express'
import { request } from 'https'

const router = Router()

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Access denied')
}

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body

  if (email && password && email === 'test' && password === 'test') {
    req.session = { loggedIn: true }
    res.redirect('/')
  } else {
    res.send('Invalid email or password')
  }
})

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Log out</a>
      </div>
    `)
  } else {
    res.send('')
  }
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('Welcome to protected route, logged in user')
})

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined
  res.redirect('/')
})

export { router }
