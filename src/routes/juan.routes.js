import {Router} from "express";
import {getReactivos} from "../controllers/juan.controller.js";
const router = Router();

router.get('/api/getReactivos', getReactivos)


export default router