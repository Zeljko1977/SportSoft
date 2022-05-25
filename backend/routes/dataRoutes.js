import express from 'express'

import {
  getData,
  setLoadData,
  getPlayers,
  getStats,
  getPlayerStats,
  getTeamStats,
  getTwoPlayersStats,
  syncData,
} from '../controllers/dataController.js'

const router = express.Router()

router.route('/all').post(getData)
router.route('/load').post(setLoadData)
router.route('/players').get(getPlayers)
router.route('/stats').post(getStats)
router.route('/playerstats').post(getPlayerStats)
router.route('/teamstats').post(getTeamStats)
router.route('/twoplayersstats').post(getTwoPlayersStats)
router.route('/sync').get(syncData)

export default router
