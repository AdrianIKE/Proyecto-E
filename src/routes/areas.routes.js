import {Router} from "express";
import {getAreas,createArea,editarArea,eliminarArea} from "../controllers/areas.controller.js";
const router = Router();

router.get('/api/getAreas', getAreas)
router.post('/api/createArea/:nombre', createArea)
router.put('/api/editarArea/:id/:nombre', editarArea)
router.delete('/api/eliminarArea/:id',eliminarArea)

export default router