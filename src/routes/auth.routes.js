import {Router} from "express";
const router = Router();

import {signup, signin, getUsers, signout} from "../controllers/auth.controller.js";
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getusers', getUsers)
router.post('/signout', signout)
export default router;