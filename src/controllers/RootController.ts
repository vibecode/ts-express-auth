import { Router, Request, Response, NextFunction } from 'express'
import { get, controller, use } from './decorators'

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
            <div>
              <div>You are logged in</div>
              <a href="/auth/logout">Log out</a>
            </div>
          `)
    } else {
      res.send(`<div>
      <div>Please log in</div>
      <a href="/auth/login">Log in</a>
    </div>`)
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Access granted')
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send('Access denied')
}
