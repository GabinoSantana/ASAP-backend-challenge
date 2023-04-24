const express = require('express')
const { getData, getFilesData } = require('../controllers/files.controllers')

const router = express.Router()

router.get('/data', getData)
router.get('/list', getFilesData)
module.exports = router
