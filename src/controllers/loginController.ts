import { Request, Response, NextFunction } from 'express'
import { get, post, controller, use, bodyValidator } from './decorators'

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
        <form method="Post">
          <div>
              <label>Email</label>
              <input name="email"/>
          </div>
      
          <div>
              <label>Password</label>
              <input name="password" type="password" />
          </div>
          <button>Submit</button>
        </form> `)
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body

    if (email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Invalid email or password')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('request was made')
  next()
}
