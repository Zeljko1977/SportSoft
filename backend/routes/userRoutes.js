import express from 'express'

import {
  registerUser,
  userLogin,
  getAllUsers,
  getSingleUser,
  updateUser,
} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(userLogin)
router.route('/svikorisnici').get(protect, getAllUsers)
router.route('/svikorisnici/:id').get(protect, getSingleUser)
router.route('/svikorisnici/update').post(protect, updateUser)

export default router
