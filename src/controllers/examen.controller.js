import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
import { Op } from "sequelize";
let models = modelosInit(sequelize);

export const getExamenes = async (req,res) => {
    let response
    try {
        response = await models.examenes.findAll({
            attributes: {exclude:['id_examen','usuario_id','area_id']},
            include: {
                model: models.usuarios,
                as: "usuario",
                attributes: {exclude:['id_usuario']}
            }
        })
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const createExamen = async (req,res) => {
    let {noreactivos,aciertos,tiempo,usuario_id,area_id} = req.body;
    let response;
    let fecha_examen = new Date();

    if(aciertos > noreactivos) {
        res.status(500).json({"Estatus": "Tu numero de aciertos no puede ser mayor al numero de reactivos"})
        return; 
    }

    try {
        response = await models.examenes.create({
            noreactivos,
            aciertos,
            fecha_examen,
            tiempo,
            usuario_id,
            area_id
        })
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const respuestas_usuarios = async (req,res) => {
    let {usuario_id,examen_id,respuestas} = req.body;
    let response;

    try {
        respuestas.forEach( async (element) => {
            response = await models.respuestas_usuarios.create({
                respuesta: element.respuesta,
                usuario_id,
                examen_id,
                reactivo_id: element.reactivo_id
            })
        });
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}