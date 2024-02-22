const { Router } = require('express')
const router = Router()

const login = require('../controllers/theatreAdmin/login')
const addShow = require('../controllers/theatreAdmin/addShow')
const deleteLocation = require('../controllers/theatreAdmin/deleteLocation')
const deleteMovie = require('../controllers/theatreAdmin/deleteMovie')
const deleteShow = require('../controllers/theatreAdmin/deleteShow')
const showInfo = require('../controllers/theatreAdmin/showInfo')

router.post('/info', showInfo)

router.post("/login", login)

router.post("/addshow", addShow)

router.post('/location', deleteLocation)

router.post('/movie', deleteMovie)

router.post('/show', deleteShow)

module.exports = router