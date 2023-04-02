import {Router} from "express";
import {getUsuarios,createUsuario,editarUsuario,eliminarUsuario} from "../controllers/usuarios.controller.js";
const router = Router();

router.get('/api/getUsuarios', getUsuarios)
router.post('/api/createUsuario', createUsuario)
router.put('/api/editarUsuario/:id', editarUsuario)
router.delete('/api/eliminarUsuario/:id',eliminarUsuario)

export default router