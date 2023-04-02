import {Router} from "express";
import {getExamenes,createExamen,respuestas_usuarios} from "../controllers/examen.controller.js";
const router = Router();

router.get('/api/getExamenes', getExamenes)
router.post('/api/createExamen', createExamen)
router.post('/api/guardaRespuestas', respuestas_usuarios)

export default router