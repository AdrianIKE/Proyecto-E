import {Router} from "express";
import { getReactivos,createReactivo,editarReactivo,eliminarReactivo } from "../controllers/reactivos.controller.js";
const router = Router();
//CRUD

router.get('/api/getReactivos', getReactivos)
router.post('/api/createReactivo', createReactivo)
router.put('/api/editarReactivo/:id',editarReactivo)
router.delete('/api/eliminarReactivo/:id',eliminarReactivo)


export default router