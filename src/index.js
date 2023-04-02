import { sequelize } from "./database/database.js";
import express from "express";
import reactivosRutas from "./routes/reactivos.routes.js"
import examenRutas from "./routes/examen.routes.js"
import areasRutas from "./routes/areas.routes.js"
import usuariosRutas from "./routes/usuarios.routes.js"
async function main(){
    try {
        await sequelize.sync({force:false})
        await sequelize.authenticate()
        console.log("Conexion a la base exitosa")
    } catch (error) {
        console.log("No se pudo conectar a la base")
        return;
    }

    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({ extended:false}));
    app.use(reactivosRutas)
    app.use(examenRutas)
    app.use(areasRutas)
    app.use(usuariosRutas)
    app.listen(3000)

    console.log("El servidor escucha en puerto 3000")
}

main();