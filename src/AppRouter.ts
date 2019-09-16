import express from 'express'

// returns express router as a singleton
export class AppRouter {
  private static instance: express.Router

  constructor() {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router()
    }

    return AppRouter.instance
  }
}
