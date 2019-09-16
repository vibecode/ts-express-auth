import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import express, {
  RequestHandler,
  Request,
  Response,
  NextFunction
} from 'express'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('invalidRequest')
      return
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('invalidRequest')
        return
      }
    }

    next()
  }
}

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = <express.Router>new AppRouter()

    for (let key in target.prototype) {
      const routerHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        []

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

      const validator = bodyValidators(requiredBodyProps)

      if (path) {
        router[method](
          routePrefix + path,
          ...middlewares,
          validator,
          routerHandler
        )
      }
    }
  }
}
