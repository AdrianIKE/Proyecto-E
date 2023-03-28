import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"

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


