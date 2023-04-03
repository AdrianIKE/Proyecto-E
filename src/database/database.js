import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "railway", // Nombre BD
    "postgres", // Usuario
    "S79fEpCTeqvBoMN3CXyX", //Password
    {
        host: "containers-us-west-107.railway.app",
        port:"6822",
        dialect:"postgres"
    }
)