import {Router} from "express";
import {getExamenes,createExamenes,respuestas_usuarios} from "../controllers/examen.controller.js";
const router = Router();

router.get('/api/getExamenes', getExamenes)
router.post('/api/createExamen', createExamenes)
router.post('/api/guardaRespuestas', respuestas_usuarios)

export default router