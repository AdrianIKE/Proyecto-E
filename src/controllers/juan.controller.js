import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
import { Op } from "sequelize";
let models = modelosInit(sequelize);

export const getReactivos = async (req,res) => {
    let response
    try {
        response = await models.reactivos.findAll({
            include: {
                model : models.reactivos,
                as : "reactivo"
            }
            
    })

    } catch (error) {
        console.log("Hubo un error: " + error)
        res.status(500).json({"Error": "Hubo un error, "+ error})
        return;
    }

    res.status(200).json(response);
}