import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
import { Op } from "sequelize";
let models = modelosInit(sequelize);

export const getUsuarios = async (req,res) => {
    let response
    try {
        response = await models.usuarios.findAll()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}


export const createUsuario = async (req,res) => {
    let {nombre,email,telefono} = req.body;
    let response;
    let aux;
    try {
        aux = await models.usuarios.findAll({
            where:{email}
        })
        if(aux.length > 0){
            res.status(406).json({
                "Estatus": "Este email ya se encuentra registrado"
            })
            return;
        }
        response = await models.usuarios.create({
            nombre,
            email,
            telefono
        })
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}


export const editarUsuario = async (req,res) => {
    let {id} = req.params;
    let {nombre,email,telefono} = req.body;
    let consulta;
    try {
        consulta = await models.usuarios.findByPk(id)
        consulta.nombre = nombre
        consulta.email = email
        consulta.telefono = telefono

        await consulta.save()
    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(consulta);
}

export const eliminarUsuario = async (req,res) => {
    let {id} = req.params;
    let response;
    try {
        response = await models.usuarios.destroy({
            where:{id_usuario:id}
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