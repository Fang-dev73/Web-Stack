import express from "express";
import {contact, createPage, getPage} from '../controllers/website'
import { isAdmin, requireSignin} from "../middlewares";

const router = express.Router();

router.post('/contact', contact);

router.post('/page', requireSignin, isAdmin, createPage);
router.get('/page/:page', getPage);

export default router;