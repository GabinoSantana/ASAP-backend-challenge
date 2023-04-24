const express = require('express')
const filesRouter = require('./files.router')

function routerApi (app) {
  const router = express.Router()
  app.use('/', router)
  router.use('/files', filesRouter)
}

module.exports = routerApi
