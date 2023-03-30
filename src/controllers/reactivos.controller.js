import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
import { Op } from "sequelize";
let models = modelosInit(sequelize);

export const getReactivos = async (req,res) => {
    let response
    try {
        response = await models.reactivos.findAll()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const createReactivo = async (req,res) => {
    let {descripcion,nombre_examen,area_id} = req.body;
    let response;
    try {
        response = await models.reactivos.create({
            descripcion,
            nombre_examen,
            area_id
        })
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const editarReactivo = async (req,res) => {
    let {id} = req.params;
    let {descripcion,nombre_examen,area_id} = req.body;
    let consulta;
    try {
        consulta = await models.reactivos.findByPk(id)
        consulta.descripcion = descripcion
        consulta.nombre_examen = nombre_examen
        consulta.area_id = area_id

        await consulta.save()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(consulta);
}

export const eliminarReactivo = async (req,res) => {
    let {id} = req.params;
    let response;
    try {
        response = await models.reactivos.destroy({
            where:{id_reactivo:id}
        })
       
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    if(response === 1){
        response = {"Estatus":"Se elimino el registro"}
    }else{
        response = {"Estatus":"No se pudo eliminar tu registro, revisa tus datos"}  
    }

    res.status(200).json(response);
}
// 1 Generar el aleatorio
// 2 Obtener las respuestas <-
// 3 generar un objeto examen
// 4 un numero de preguntas fijo (5,10,3)
export const generarExamen = async (req,res) => {
    let consulta;
    let numero;
    let numero_preguntas = req.params.preguntas;
    let preguntas = []
    try{
        consulta = await models.reactivos.findAll({
            attributes: {exclude:['id_reactivo','area_id']},
            include:{
                model: models.respuestas,
                as: "respuesta",
                attributes: {exclude:['id_respuesta','reactivo_id']}
            }
        })

        if(numero_preguntas > consulta.length){
            console.log("No se cuentan con "+numero_preguntas+" preguntas, intenta con un numero menor")
            res.status(500).json({"Error": `No se cuentan con ${numero_preguntas} preguntas, actualmente hay ${consulta.length} preguntas`})
            return;  
        }

        

        for (let i = 0; i < numero_preguntas ; i++) {
            numero = 0;
            numero = getRandomInt(consulta.length);
            
            if(typeof consulta[numero] === 'undefined' ){
                i--;
            }else{
                preguntas.push(consulta[numero]);
                delete(consulta[numero]) 
            }
            
        }
        
    }catch(error){
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(preguntas);
}

export const obtenerRespuesta = async (req,res) => {
    let consulta;
    let {noReactivo,respuesta} = req.params;
    try{
        consulta = await models.respuestas.findAll({
            attributes: ['escorrecto'],
            where:{
                reactivo_id: noReactivo,
                descripcion: {[Op.like]: `${respuesta}%`}
            }
        })
 
    }catch(error){
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(consulta);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

