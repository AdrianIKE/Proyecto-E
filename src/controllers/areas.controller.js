import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
let models = modelosInit(sequelize);

export const getAreas = async (req,res) => {
    let response
    try {
        response = await models.areas.findAll()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const createArea = async (req,res) => {
    let {nombre} = req.params;
    let response;
    try {
        response = await models.areas.create({
            nombre
        })
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}

export const editarArea = async (req,res) => {
    let {id,nombre} = req.params;
    let consulta;
    try {
        consulta = await models.areas.findByPk(id)
        consulta.nombre = nombre

        await consulta.save()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(consulta);
}

export const eliminarArea = async (req,res) => {
    let {id} = req.params;
    let response;
    try {
        response = await models.areas.destroy({
            where:{id_area:id}
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