import modelosInit from "../models/init-models.js"
import {sequelize} from "../database/database.js"
import { Op } from "sequelize";
let models = modelosInit(sequelize);